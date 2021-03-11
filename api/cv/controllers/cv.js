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

module.exports = {
  async requestOTP(event) {
    const userId = event.queryStringParameters.id;
    const { userPhone, msgContent } = JSON.parse(event.body);
    const user = await strapi.plugins["users-permissions"].models.user
      .findOne(userId)
      .populate("profile");
    if (!user) throw new Error(`Tài khoản ${userPhone} không tồn tại`);
    if (user.confirmed || user.otp !== "")
      throw new Error("Tài khoản đã được kích hoạt");
    const otp = generateRegisterOTP();
    const updatedUser = await strapi.plugins[
      "users-permissions"
    ].models.user.update({ id: user.id }, { otp });
    if (!updatedUser) throw new Error("Tài khoản không tồn tại!");
    msgContent = clearUnicode(msgContent);
    const balance = await getBalance();
    const fee = getSMSfee(userPhone, msgContent);
    if (balance < fee) {
      throw new Error(
        `Gửi SMS hiện tại không khả dụng, xin vui lòng thử lại sau.`
      );
    }
    return await sendSMS(userPhone, msgContent, otp);
  },
  async confirmOTP(event) {
    const userId = event.queryStringParameters.id;
    const { userPhone, otp } = JSON.parse(event.body);
    const user = await strapi.plugins["users-permissions"].models.user
      .findOne(userId)
      .populate("profile");
    if (!user) throw new Error(`Tài khoản ${userPhone} không tồn tại`);
    if (user.confirmed && otp === "")
      throw new Error(`Tài khoản ${userPhone} đã được kích hoạt`);
    if (
      (user.otp === otp && userPhone === user.username) ||
      (user.otp === FIXED_OTP && userPhone === user.username)
    ) {
      await strapi.plugins["users-permissions"].models.user.update(
        { id: user.id },
        { confirm: true, otp: "" }
      );
      return "Đăng ký thành công!";
    }
    throw new Error("Xác nhận OTP không thành công!");
  },
};
