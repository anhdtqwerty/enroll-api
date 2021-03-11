"use strict";
const soapRequest = require("easy-soap-request");
const DomParser = require("dom-parser");
const { getSMSXML, getBalanceXML, getSMSfee } = require("./cvHelper.js");
const { generateRegisterOTP, clearUnicode } = require("../../utility.js");

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
  const { response: balanceResponse } = await soapRequest({
    url: soapUrl,
    headers,
    xml: balanceXML,
    timeout: 1000,
  });
  const parser = new DomParser();
  doc = parser.parseFromString(balanceResponse, "text/xml");
  return doc.getElementsByTagName("balance")[0].textContent;
};

const sendSMS = async (userPhone, msgContent, otp) => {
  const smsXML = getSMSXML(userPhone, msgContent, otp);
  const { response: smsResponse } = await soapRequest({
    soapUrl,
    headers,
    xml: smsXML,
    timeout: 5000,
  });
  if (smsResponse.statusCode !== "200")
    throw new Error(
      "Gửi SMS hiện tại không khả dụng, xin vui lòng thử lại sau."
    );
  const parser = new DomParser();
  doc = parser.parseFromString(smsResponse, "text/xml");
  const responseMessage = doc.getElementsByTagName("message")[0].textContent;
  const responseResult = doc.getElementsByTagName("result")[0].textContent;
  if (responseResult === "0") throw new Error(`Error ${responseMessage}`);
  return `Gửi tin nhắn thành công đến số điện thoại ${userPhone}`;
};

const checkUser = async (userId, userPhone) => {
  console.log(userId);
  //   const user = await strapi.plugins["users-permissions"].models.user
  //     .findOne({ id: userId })
  //     .populate("profile");
  const user = await strapi
    .query("user", "users-permissions")
    .findOne({ id: userId });
  console.log(user);
  if (!user) throw new Error(`Tài khoản ${userPhone} không tồn tại`);
  if (user.confirmed || user.otp !== "")
    throw new Error(`Tài khoản ${userPhone} đã được kích hoạt`);
  return user;
};

const updateUserOtp = async (user, otp) => {
  const updatedUser = await strapi.plugins[
    "users-permissions"
  ].models.user.update({ id: user.id }, { otp });
  if (!updatedUser) throw new Error("Tài khoản không tồn tại!");
  return updatedUser;
};

const isOTPValid = (user, userPhone, otp) => {
  return (
    (user.otp === otp && userPhone === user.username) ||
    (user.otp === FIXED_OTP && userPhone === user.username)
  );
};

module.exports = {
  async requestOTP(event) {
    const userId = event.params.id;
    const { userPhone, msgContent } = event.request.body;
    try {
      const user = await checkUser(userId, userPhone);
      const otp = generateRegisterOTP();
      const updatedUser = await updateUserOtp(user, otp);
      msgContent = clearUnicode(msgContent);
      const balance = await getBalance();
      const fee = getSMSfee(userPhone, msgContent);
      if (balance < fee) {
        throw new Error(
          `Gửi SMS hiện tại không khả dụng, xin vui lòng thử lại sau.`
        );
      }
      return await sendSMS(userPhone, msgContent, otp);
    } catch (error) {
      throw error;
    }
  },
  async confirmOTP(event) {
    const userId = event.params.id;
    const { userPhone, otp } = event.request.body;
    try {
      const user = await checkUser(userId, userPhone);
      if (isOTPValid(user, userPhone, otp)) {
        await strapi.plugins["users-permissions"].models.user.update(
          { id: user.id },
          { confirm: true, otp: "" }
        );
        return "Đăng ký thành công!";
      }
      throw new Error("Xác nhận OTP không thành công!");
    } catch (error) {
      throw error;
    }
  },
};
