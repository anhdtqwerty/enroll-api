"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
 */
const { clearUnicode } = require("../../utility.js");
const moment = require("moment");
const soapRequest = require("easy-soap-request");
const DomParser = require("dom-parser");
const cron = require("node-cron");
const {
  getSMSXML,
  getBalanceXML,
  getSMSfee,
} = require("../controllers/cvHelper.js");
moment.locale("vi");
const soapUrl = "http://ams.tinnhanthuonghieu.vn:8009/bulkapi?wsdl";
const headers = {
  "user-agent": "LTV-Enrollment",
  "Content-Type": "text/xml;charset=UTF-8",
  soapAction: "",
};
const FIXED_OTP = "270996";
const CONTENT_OTP_SMS =
  "Ma OTP cua ban la {{otp}}. OTP cua ban co hieu luc trong 5 phut";

const OPEN_DOCUMENT = "04/04/2021 00:00:00";
const CHOOSE_DEPARTMENT = "01/03/2021 00:00:00";
const FILL_INFO = "01/03/2021 00:00:00";
const REGISTER_EXPECTATION = "01/03/2021 00:00:00";

const ENTRY_EXAM_RESULT_GRADE6 = "01/03/2021 00:00:00";
const STUDY_RESULT_GRADE6 = "01/03/2021 00:00:00";
const CLOSE_FILL_INFO_GRADE6 = "07/06/2021 22:00:00";
const CLOSE_CREATE_DOCUMENT_GRADE6 = "13/06/2021 22:00:00";
const CLOSE_SUBMIT_DOCUMENT_GRADE6 = "07/06/2021 22:00:00";
const DISPLAY_EXAM_RESULT_GRADE6 = "07/06/2022 22:00:00"; //open

const STUDY_RESULT_GRADE10 = "01/03/2021 00:00:00";
const CLOSE_FILL_INFO_GRADE10 = "10/06/2022 23:00:00"; //open
const CLOSE_FILL_EXAM_RESULT_GRADE10 = "14/06/2022 00:00:00"; //open
const CLOSE_CREATE_DOCUMENT_GRADE10 = "10/06/2022 00:00:00"; //open
const CLOSE_SUBMIT_DOCUMENT_GRADE10 = "14/06/2022 00:00:00"; //open
const ENTRY_EXAM_RESULT_GRADE10 = "11/06/2022 15:00:00"; //open
const DISPLAY_EXAM_RESULT_GRADE10 = "16/06/2022 14:00:00"; //open
let resetHourlySMSTask;

const isNowAfterDatetime = (comparingDate) => {
  return !moment(comparingDate, "DD/MM/YYYY HH:mm:ss")
    .locale("vi")
    .isAfter(new Date().toISOString());
};
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

const clearUserHourlyLimitOTP = async () => {
  console.log(
    `*** ${moment().format(
      "DD/MM/YYYY HH:mm:ss"
    )} - Start Reset Users'Hourly SMS Limitation`
  );
  const users = await strapi.plugins[
    "users-permissions"
  ].services.user.fetchAll();
  const promises = users.map((user) => {
    return strapi
      .query("user", "users-permissions")
      .update({ id: user.id }, { hourlySMSNum: 0 });
  });
  await Promise.all(promises);
  console.log(
    `*** ${moment().format(
      "DD/MM/YYYY HH:mm:ss"
    )} - Done Start Reset Users'Hourly SMS Limitation`
  );
};

module.exports = {
  clearUserHourlyLimitOTP,
  startResetHourlySMS: async () => {
    resetHourlySMSTask = cron.schedule("0 0 */1 * * *", () => {
      clearUserHourlyLimitOTP();
    });
    resetHourlySMSTask.start();
  },
  stopResetHourlySMS: async () => {
    resetHourlySMSTask.stop();
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

  checkDocumentSystemTime: (grade) => {
    let result = {};
    let times = {};
    result["choose-department"] = isNowAfterDatetime(CHOOSE_DEPARTMENT);
    result["fill-info"] = isNowAfterDatetime(FILL_INFO);
    times["choose-department"] = CHOOSE_DEPARTMENT;
    times["fill-info"] = FILL_INFO;
    if (grade === "Khối 6") {
      result["study-result"] = isNowAfterDatetime(STUDY_RESULT_GRADE6);
      result["exam-result"] = isNowAfterDatetime(ENTRY_EXAM_RESULT_GRADE6);
      result["close-fill-info"] = isNowAfterDatetime(CLOSE_FILL_INFO_GRADE6);
      result["display-exam-result"] = isNowAfterDatetime(
        DISPLAY_EXAM_RESULT_GRADE6
      );
      result["close-document"] = isNowAfterDatetime(
        CLOSE_SUBMIT_DOCUMENT_GRADE6
      );

      times["study-result"] = STUDY_RESULT_GRADE6;
      times["exam-result"] = ENTRY_EXAM_RESULT_GRADE6;
      times["close-fill-info"] = CLOSE_FILL_INFO_GRADE6;
      times["display-exam-result"] = DISPLAY_EXAM_RESULT_GRADE6;
      times["close-document"] = CLOSE_SUBMIT_DOCUMENT_GRADE6;
    } else if (grade === "Khối 10") {
      result["register-expectation"] = isNowAfterDatetime(REGISTER_EXPECTATION);
      result["exam-result"] = isNowAfterDatetime(ENTRY_EXAM_RESULT_GRADE10);
      result["study-result"] = isNowAfterDatetime(STUDY_RESULT_GRADE10);
      result["close-fill-info"] = isNowAfterDatetime(CLOSE_FILL_INFO_GRADE10);
      result["close-fill-exam-result"] = isNowAfterDatetime(
        CLOSE_FILL_EXAM_RESULT_GRADE10
      );
      result["display-exam-result"] = isNowAfterDatetime(
        DISPLAY_EXAM_RESULT_GRADE10
      );
      result["close-document"] = isNowAfterDatetime(
        CLOSE_SUBMIT_DOCUMENT_GRADE10
      );

      times["exam-result"] = ENTRY_EXAM_RESULT_GRADE10;
      times["register-expectation"] = REGISTER_EXPECTATION;
      times["study-result"] = STUDY_RESULT_GRADE10;
      times["close-fill-info"] = CLOSE_FILL_INFO_GRADE10;
      times["close-fill-exam-result"] = CLOSE_FILL_EXAM_RESULT_GRADE10;
      times["display-exam-result"] = DISPLAY_EXAM_RESULT_GRADE10;
      times["close-document"] = CLOSE_SUBMIT_DOCUMENT_GRADE10;
    }
    return {
      checkDocumentSystemTime: result,
      documentSystemTime: times,
    };
  },

  checkSystemTime: () => {
    let result = {};
    let times = {};
    result["open-document"] = isNowAfterDatetime(OPEN_DOCUMENT);
    result["grade6-close-create"] = isNowAfterDatetime(
      CLOSE_CREATE_DOCUMENT_GRADE6
    );
    result["grade10-close-create"] = isNowAfterDatetime(
      CLOSE_CREATE_DOCUMENT_GRADE10
    );
    result["grade10-document"] = isNowAfterDatetime(
      CLOSE_SUBMIT_DOCUMENT_GRADE10
    );
    times["open-document"] = OPEN_DOCUMENT;
    times["grade6-close-create"] = CLOSE_CREATE_DOCUMENT_GRADE6;
    times["grade6-close-document"] = CLOSE_SUBMIT_DOCUMENT_GRADE6;
    times["grade10-close-create"] = CLOSE_CREATE_DOCUMENT_GRADE10;
    times["grade10-close-document"] = CLOSE_SUBMIT_DOCUMENT_GRADE10;
    return {
      checkSystemTime: result,
      systemTime: times,
    };
  },
};
