"use strict";
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
  async requestOTP(event) {
    let { userPhone, requestType } = event.request.body;
    const user = await strapi.services.cv.isUserValid(userPhone);
    if (requestType === "register" && user.isConfirmedOTP)
      event.throw(500, `Tài khoản ${userPhone} đã được kích hoạt`);
    const otp = generateOTP();
    const otpExpireTime = moment().add(5, "minutes").toISOString();
    const query = strapi.services.cv.updateOTPQuery(
      otp,
      otpExpireTime,
      requestType
    );
    let msgContent = strapi.services.cv.replaceContentOTP(otp);
    try {
      await strapi.services.cv.updateUser(user, query);
      return await strapi.services.cv.sendSMS(userPhone, msgContent, otp);
    } catch (error) {
      event.throw(500, error);
    }
  },
  async confirmRegister(event) {
    const { userPhone, otp } = event.request.body;
    const user = await strapi.services.cv.isUserValid(userPhone);
    if (user.isConfirmedOTP)
      event.throw(500, `Tài khoản ${userPhone} đã được kích hoạt`);
    if (!user.confirmRegisterOTP || user.confirmRegisterOTP == "")
      event.throw(500, `Có lỗi khi gửi OTP. Xin vui lòng thử lại`);
    if (!strapi.services.cv.isOTPValid(user, userPhone, otp, "register"))
      event.throw(500, "Mã OTP không chính xác");
    if (strapi.services.cv.isOTPExpired(user.registerOTPExpired, "register"))
      event.throw(500, "Mã OTP đã hết hạn");
    try {
      await strapi.services.cv.updateUser(user, {
        isConfirmedOTP: true,
        confirmRegisterOTP: "",
      });
      return "Đăng ký thành công!";
    } catch (error) {
      event.throw(500, error);
    }
  },
  async confirmResetPassword(event) {
    const phone = event.params.phone;
    const { otp } = event.request.body;
    const user = await strapi.services.cv.isUserValid(phone);
    if (user.isConfirmedReset)
      event.throw(500, `Xin vui lòng thử lại đổi mật khẩu`);
    if (!user.resetPasswordOTP || user.resetPasswordOTP == "")
      event.throw(500, `Có lỗi khi gửi OTP. Xin vui lòng thử lại`);
    if (!strapi.services.cv.isOTPValid(user, phone, otp, "reset-password"))
      event.throw(500, "Mã OTP không chính xác");
    if (strapi.services.cv.isOTPExpired(user.resetOTPExpired, "reset-password"))
      event.throw(500, "Mã OTP đã hết hạn");
    try {
      await strapi.services.cv.updateUser(user, {
        isConfirmedReset: true,
        otp: "",
      });
      return "Xin vui lòng nhập mật khẩu mới";
    } catch (error) {
      event.throw(500, error);
    }
  },
  async changePassword(event) {
    const phone = event.params.phone;
    const { newPassword, confirmNewPassword } = event.request.body;
    const user = await strapi.services.cv.isUserValid(phone);
    if (newPassword !== confirmNewPassword)
      event.throw(500, `Mật khẩu (nhập lại) không trùng khớp với mật khẩu`);
    const hashPassword = await strapi.admin.services.auth.hashPassword(
      newPassword
    );
    if (hashPassword === user.password)
      event.throw(500, `Mật khẩu mới không được trùng với mật khẩu cũ`);
    try {
      await strapi.services.cv.updateUser(user, {
        isConfirmedReset: false,
        password: hashPassword,
      });
      return "Đổi mật khẩu thành công!";
    } catch (error) {
      event.throw(500, error);
    }
  },
  async create(event) {
    const item = event.request.body;
    const code = event.params.activeCode;
    if (!item.userPhone)
      event.throw(500, "Xin vui lòng đăng nhập để tạo hồ sơ");
    const user = await strapi.services.cv.isUserValid(item.userPhone);
    if (!user.isConfirmedOTP)
      event.throw(500, "Xin vui lòng kích hoạt tài khoản trước");
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
    event.throw(500, "Tạo hồ sơ mới không thành công! Xin vui lòng thử lại");
  },
};
