"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
 */
const { clearUnicode } = require("../../utility.js");
const moment = require("moment");
const soapRequest = require("easy-soap-request");
const DomParser = require("dom-parser");
const {
  getSMSXML,
  getBalanceXML,
  getSMSfee,
} = require("../controllers/cvHelper.js");

const soapUrl = "http://ams.tinnhanthuonghieu.vn:8009/bulkapi?wsdl";
const headers = {
  "user-agent": "LTV-Enrollment",
  "Content-Type": "text/xml;charset=UTF-8",
  soapAction: "",
};
const FIXED_OTP = "270996";
const CONTENT_OTP_SMS =
  "Ma OTP cua ban la {{otp}}. OTP cua ban co hieu luc trong 5 phut";

module.exports = {
  getBalance: async () => {
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
  },

  sendSMS: async (userPhone, msgContent, otp) => {
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
  },

  isUserValid: async (userPhone) => {
    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ username: userPhone });
    if (!user) throw new Error(`Tài khoản ${userPhone} không tồn tại`);
    return user;
  },

  updateUser: async (user, item) => {
    const updatedUser = await strapi
      .query("user", "users-permissions")
      .update({ id: user.id }, { ...item });
    if (!updatedUser) throw new Error("Cập nhật tài khoản thất bại");
    return updatedUser;
  },

  isOTPValid: (user, userPhone, otp, requestType) => {
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
  },

  isOTPExpired: (user, requestType) => {
    if (requestType === "register")
      return moment().isAfter(user.registerOTPExpired);
    else if (requestType === "reset-password")
      return moment().isAfter(user.resetOTPExpired);
    return false;
  },

  replaceContentOTP: (otp) => {
    let msgContent = CONTENT_OTP_SMS;
    msgContent = msgContent.replace("{{otp}}", otp);
    msgContent = clearUnicode(msgContent);
    return msgContent;
  },

  updateOTPQuery: (otp, otpExpireTime, requestType) => {
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
  },
};
