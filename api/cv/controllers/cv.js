"use strict";
const soapRequest = require("easy-soap-request");
const DomParser = require("dom-parser");
const { sanitizeEntity } = require("strapi-utils");
const { getSMSXML, getBalanceXML, getSMSfee } = require("./cvHelper.js");
const {
  generateRegisterOTP: generateOTP,
  clearUnicode,
} = require("../../utility.js");
const moment = require("moment");

const soapUrl = "http://ams.tinnhanthuonghieu.vn:8009/bulkapi?wsdl";
const headers = {
  "user-agent": "LTV-Enrollment",
  "Content-Type": "text/xml;charset=UTF-8",
  soapAction: "",
};
const FIXED_OTP = "270996";
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const getBalance = async () => {
  const balanceXML = getBalanceXML();
  const { response } = await soapRequest({
    url: soapUrl,
    headers,
    xml: balanceXML,
    timeout: 1000,
  });
  const parser = new DomParser();
  const doc = parser.parseFromString(response.body, "text/xml");
  return doc.getElementsByTagName("balance")[0].textContent;
};

const sendSMS = async (userPhone, msgContent, otp) => {
  const balance = await getBalance();
  const fee = getSMSfee(userPhone, msgContent);
  if (balance < fee) {
    throw new Error(
      `Gửi SMS hiện tại không khả dụng, xin vui lòng thử lại sau`
    );
  }
  const smsXML = getSMSXML(userPhone, msgContent, otp);
  const { response } = await soapRequest({
    url: soapUrl,
    headers,
    xml: smsXML,
    timeout: 5000,
  });
  if (response.statusCode !== 200)
    throw new Error(
      "Gửi SMS hiện tại không khả dụng, xin vui lòng thử lại sau"
    );
  const parser = new DomParser();
  const doc = parser.parseFromString(response.body, "text/xml");
  const responseMessage = doc.getElementsByTagName("message")[0].textContent;
  const responseResult = doc.getElementsByTagName("result")[0].textContent;
  if (responseResult === "0") throw new Error(`Error ${responseMessage}`);
  return `Gửi tin nhắn thành công đến số điện thoại ${userPhone}`;
};

const isUserValid = async (userPhone, userId) => {
  let query = { username: userPhone };
  if (userId) query.id = userId;
  const user = await strapi.query("user", "users-permissions").findOne(query);
  if (!user) throw new Error(`Tài khoản ${userPhone} không tồn tại`);
  return user;
};

const updateUser = async (user, item) => {
  const updatedUser = await strapi
    .query("user", "users-permissions")
    .update({ id: user.id }, { ...item });
  if (!updatedUser) throw new Error("Cập nhật tài khoản thất bại");
  return updatedUser;
};

const isOTPValid = (user, userPhone, otp, requestType) => {
  if (requestType === "register")
    return (
      otp === FIXED_OTP ||
      (user.confirmRegisterOTP &&
        userPhone === user.username &&
        user.confirmRegisterOTP == otp)
    );
  else if (requestType === "reset-password")
    return (
      otp === FIXED_OTP ||
      (user.resetPasswordOTP &&
        userPhone === user.username &&
        user.resetPasswordOTP == otp)
    );
  return false;
};

const isOTPExpired = (user, requestType) => {
  if (requestType === "register")
    return moment().isAfter(user.registerOTPExpired);
  else if (requestType === "reset-password")
    return moment().isAfter(user.resetOTPExpired);
  return false;
};

const replaceContentOTP = (msgContent, otp) => {
  msgContent = msgContent.replace("{{otp}}", otp);
  msgContent = clearUnicode(msgContent);
  return msgContent;
};

const updateOTPQuery = (otp, otpExpireTime, requestType) => {
  let data = {};
  switch (requestType) {
    case "register":
      data = {
        confirmRegisterOTP: otp,
        registerOTPExpired: otpExpireTime,
      };
      break;
    case "reset-password":
      data = {
        resetPasswordOTP: otp,
        resetOTPExpired: otpExpireTime,
      };
      break;
    default:
      throw new Error(`Invalid request type ${requestType}`);
  }
  return data;
};

module.exports = {
  async requestOTP(event) {
    let { userPhone, msgContent, requestType } = event.request.body;
    const user = await isUserValid(userPhone, null);
    if (requestType === "register" && user.isConfirmedOTP)
      event.throw(500, `Tài khoản ${userPhone} đã được kích hoạt`);
    const otp = generateOTP();
    const otpExpireTime = moment().add(5, "minutes").toISOString();
    const query = updateOTPQuery(otp, otpExpireTime, requestType);
    msgContent = replaceContentOTP(msgContent, otp);
    try {
      await updateUser(user, query);
      return "Thành công"
      // return await sendSMS(userPhone, msgContent, otp);
    } catch (error) {
      event.throw(500, error);
    }
  },
  async confirmRegister(event) {
    const userId = event.params.id;
    const { userPhone, otp } = event.request.body;
    const user = await isUserValid(userPhone, userId);
    if (user.isConfirmedOTP)
      event.throw(500, `Tài khoản ${userPhone} đã được kích hoạt`);
    if (!user.confirmRegisterOTP || user.confirmRegisterOTP == "")
      event.throw(500, `Có lỗi khi gửi OTP. Xin vui lòng thử lại`);
    if (!isOTPValid(user, userPhone, otp, "register"))
      event.throw(500, "Mã OTP không chính xác");
    if (isOTPExpired(user.registerOTPExpired, "register"))
      event.throw(500, "Mã OTP đã hết hạn");
    try {
      await updateUser(user, { isConfirmedOTP: true, confirmRegisterOTP: "" });
      return "Đăng ký thành công!";
    } catch (error) {
      event.throw(500, error);
    }
  },
  async confirmResetPassword(event) {
    const userId = event.params.id;
    const {
      userPhone,
      otp,
      newPassword,
      confirmNewPassword,
    } = event.request.body;
    const user = await isUserValid(userPhone, userId);
    if (newPassword !== confirmNewPassword)
      event.throw(500, "Mật khẩu (nhập lại) không trùng khớp với mật khẩu");
    if (!isOTPValid(user, userPhone, otp, "register"))
      event.throw(500, "Mã OTP không chính xác");
    if (isOTPExpired(user.resetOTPExpired, "register"))
      event.throw(500, "Mã OTP đã hết hạn");
    try {
      await updateUser(user, { password: newPassword, resetPasswordOTP: "" });
      return "Đặt lại mật khẩu thành công";
    } catch (error) {
      event.throw(500, error);
    }
  },
};
