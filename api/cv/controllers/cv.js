"use strict";
var cron = require("node-cron");
const {
  generateRegisterOTP: generateOTP,
  clearUnicode,
  isCodeValid,
} = require("../../utility.js");
const moment = require("moment");
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOneByCode(event) {
    const code = event.params.code;
    const CV = await strapi.services.cv.find({ code });
    if (!CV || CV.length == 0)
      throw strapi.errors.badRequest(`CV with code ${code} does not exists!`);
    return CV[0];
  },
  async startHourlySMSTask(event) {
    try {
      console.log("Start cron task!");
      await strapi.services.cv.startResetHourlySMS();
      return "Start cron task!";
    } catch (error) {
      throw strapi.errors.badRequest(error);
    }
  },
  async stopHourlySMSTask(event) {
    try {
      console.log("Stop cron task!");
      await strapi.services.cv.stopResetHourlySMS();
      return "Stop cron task!";
    } catch (error) {
      throw strapi.errors.badRequest(error);
    }
  },
  async requestOTP(event) {
    let { userPhone, requestType } = event.request.body;
    try {
      const user = await strapi
        .query("user", "users-permissions")
        .findOne({ username: userPhone });
      if (!user)
        throw strapi.errors.badRequest(`Tài khoản ${userPhone} không tồn tại`);
      if (requestType === "register" && user.isConfirmedOTP)
        throw strapi.errors.badRequest(
          `Tài khoản ${userPhone} đã được kích hoạt`
        );
      if (user.hourlySMSNum >= 5)
        return `Đã vượt quá 5 tin nhắn/giờ, xin vui lòng thử lại với mã OTP đã được gửi đến số điện thoại ${userPhone}!`;
      const otp = generateOTP();
      const otpExpireTime = moment().add(5, "minutes").toISOString();
      const query = strapi.services.cv.updateOTPQuery(
        otp,
        otpExpireTime,
        requestType
      );
      query.hourlySMSNum = user.hourlySMSNum + 1;
      query.SMSNum = user.SMSNum + 1;
      let msgContent = strapi.services.cv.replaceContentOTP(otp);
      const smsResult = await strapi.services.cv.sendSMS(
        userPhone,
        msgContent,
        otp
      );
      await strapi.services.cv.updateUser(user, query);
      return smsResult;
    } catch (error) {
      await strapi.services.cv.updateUser(user, {
        log: {
          name: "Send SMS Error",
          ...error,
        },
      });
      throw strapi.errors.badRequest(error);
    }
  },
  async confirmRegister(event) {
    const { userPhone, otp } = event.request.body;
    const user = await strapi.services.cv.isUserValid(userPhone);
    if (user.isConfirmedOTP)
      throw strapi.errors.badRequest(
        `Tài khoản ${userPhone} đã được kích hoạt`
      );
    if (!user.confirmRegisterOTP || user.confirmRegisterOTP == "")
      throw strapi.errors.badRequest(
        `Có lỗi khi gửi OTP. Xin vui lòng thử lại`
      );
    if (!strapi.services.cv.isOTPValid(user, userPhone, otp, "register"))
      throw strapi.errors.badRequest("Mã OTP không chính xác");
    if (strapi.services.cv.isOTPExpired(user.registerOTPExpired, "register"))
      throw strapi.errors.badRequest("Mã OTP đã hết hạn");
    try {
      await strapi.services.cv.updateUser(user, {
        isConfirmedOTP: true,
        confirmRegisterOTP: "",
      });
      return "Đăng ký thành công!";
    } catch (error) {
      throw strapi.errors.badRequest(error);
    }
  },
  async confirmResetPassword(event) {
    const phone = event.params.phone;
    const { otp } = event.request.body;
    const user = await strapi.services.cv.isUserValid(phone);
    if (user.isConfirmedReset)
      throw strapi.errors.badRequest(`Xin vui lòng thử lại đổi mật khẩu`);
    if (!user.resetPasswordOTP || user.resetPasswordOTP == "")
      throw strapi.errors.badRequest(
        `Có lỗi khi gửi OTP. Xin vui lòng thử lại`
      );
    if (!strapi.services.cv.isOTPValid(user, phone, otp, "reset-password"))
      throw strapi.errors.badRequest("Mã OTP không chính xác");
    if (strapi.services.cv.isOTPExpired(user.resetOTPExpired, "reset-password"))
      throw strapi.errors.badRequest("Mã OTP đã hết hạn");
    try {
      await strapi.services.cv.updateUser(user, {
        isConfirmedReset: true,
        otp: "",
      });
      return "Xin vui lòng nhập mật khẩu mới";
    } catch (error) {
      throw strapi.errors.badRequest(error);
    }
  },
  async changePassword(event) {
    const phone = event.params.phone;
    const { newPassword, confirmNewPassword } = event.request.body;
    const user = await strapi.services.cv.isUserValid(phone);
    if (newPassword !== confirmNewPassword)
      throw strapi.errors.badRequest(
        `Mật khẩu (nhập lại) không trùng khớp với mật khẩu`
      );
    const hashPassword = await strapi.admin.services.auth.hashPassword(
      newPassword
    );
    if (hashPassword === user.password)
      throw strapi.errors.badRequest(
        `Mật khẩu mới không được trùng với mật khẩu cũ`
      );
    try {
      await strapi.services.cv.updateUser(user, {
        isConfirmedReset: false,
        password: hashPassword,
      });
      return "Đổi mật khẩu thành công!";
    } catch (error) {
      throw strapi.errors.badRequest(error);
    }
  },
  async create(event) {
    const { userPhone } = event.request.body;
    const code = event.params.code;
    if (!userPhone)
      throw strapi.errors.badRequest("Xin vui lòng đăng nhập để tạo hồ sơ");
    const user = await strapi.services.cv.isUserValid(userPhone);
    if (!user.isConfirmedOTP)
      throw strapi.errors.badRequest("Xin vui lòng kích hoạt tài khoản trước");
    if (strapi.services["active-code"].checkActiveCode(code)) {
      let newCV = {};
      try {
        let activeCode = await strapi.services["active-code"].findOne({
          code: code,
        });
        newCV = await strapi.services.cv.create({
          code: code,
          type: activeCode.grade,
          activeCode: activeCode.id,
          parent: user.id,
          status: "created",
          department: activeCode.department || "unset",
        });
        activeCode = await strapi.services["active-code"].update(
          { id: activeCode.id, code },
          {
            cv: newCV.id,
            userPhone: user.username,
            activeDate: new Date().toISOString(),
            status: "active",
          }
        );
        newCV.activeCode = activeCode;
        delete newCV.parent.password;
        return newCV;
      } catch (error) {
        event.throw(
          500,
          "Tạo hồ sơ mới không thành công! Xin vui lòng thử lại"
        );
      }
    }
    throw strapi.errors.badRequest(
      "Tạo hồ sơ mới không thành công! Xin vui lòng thử lại"
    );
  },
  async update(event) {
    const { submitType, userPhone, ...item } = event.request.body;
    const code = event.params.code;
    if (!userPhone)
      throw strapi.errors.badRequest("Xin vui lòng đăng nhập để tạo hồ sơ");
    const user = await strapi.services.cv.isUserValid(userPhone);
    if (!user.isConfirmedOTP)
      throw strapi.errors.badRequest("Xin vui lòng kích hoạt tài khoản trước");
    if (
      submitType != "save-draft" &&
      submitType != "complete-step" &&
      submitType != "update-exam-result"
    )
      throw strapi.errors.badRequest("Kiểu cập nhật hồ sơ không khả dụng");
    if (item.step) delete item.step;
    const existingCV = await strapi.services.cv.findOne({
      code: code,
    });
    if (!existingCV) throw strapi.errors.badRequest("Hồ sơ không tồn tại");
    if (existingCV.parent.id !== user.id && user.role.type !== "admin")
      throw strapi.errors.badRequest("Không có quyền để chỉnh sửa hồ sơ này");
    if (submitType === "complete-step") {
      if (
        (existingCV.type === "Khối 6" && existingCV.step < 4) ||
        (existingCV.type === "Khối 10" && existingCV.step < 5)
      )
        item.step = existingCV.step + 1;
      item.isDraft = false;
    } else if (submitType === "save-draft") item.isDraft = true;
    else if (submitType === "update-exam-result") {
      if (user.role.type !== "admin")
        event.throw(
          500,
          "Chỉ admin mới có quyền thay đổi kết quả thi của học sinh"
        );
    } else throw strapi.errors.badRequest("Cập nhật hồ sơ không khả dụng");
    try {
      let updatedCV = await strapi.services.cv.update(
        {
          id: existingCV.id,
          code,
        },
        {
          ...item,
        }
      );
      delete updatedCV.parent.password;
      return updatedCV;
    } catch (e) {
      throw strapi.errors.badRequest(
        "Cập nhật hồ sơ không thành công! Xin vui lòng thử lại"
      );
    }
  },
  async checkDocumentSystemTime(event) {
    const { grade } = event.request.body;
    if (grade !== "Khối 6" && grade !== "Khối 10")
      throw strapi.errors.badRequest("Khối không khả dụng");
    return strapi.services.cv.checkDocumentSystemTime(grade);
  },
  async checkSystemTime(event) {
    return strapi.services.cv.checkSystemTime();
  },
};
