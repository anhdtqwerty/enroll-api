"use strict";
const { sanitizeEntity } = require("strapi-utils");
const { generateDocumentCode, isCodeValid } = require("../../utility.js");
const moment = require("moment");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const generateCode = async () => {
  let code = "";
  let existingCode = {};
  do {
    code = generateDocumentCode();
    existingCode = await strapi.services["active-code"].findOne({
      code: code,
    });
  } while (existingCode);
  return code;
};
module.exports = {
  async create(event) {
    const item = event.request.body;
    delete item.code;
    if (item.grade !== "Khối 6" && item.grade !== "Khối 10")
      throw strapi.errors.badRequest(`Khối ${item.grade} không khả dụng`);
    item.code = await generateCode();
    return await strapi.services["active-code"].create(
      sanitizeEntity(
        {
          ...item,
          code: item.code,
        },
        {
          model: strapi.models["active-code"],
        }
      )
    );
  },
  async validate(event) {
    const { code } = event.request.body;
    const existingCode = await strapi.services["active-code"].findOne({
      code: code,
    });
    if (!existingCode) throw strapi.errors.badRequest("Mã kích hoạt không tồn tại");
    if (!isCodeValid(code)) throw strapi.errors.badRequest("Mã kích hoạt không hợp lệ");
    if (existingCode.grade !== "Khối 6" && existingCode.grade !== "Khối 10")
      throw strapi.errors.badRequest("Mã kích hoạt không hợp lệ");
    if (
      existingCode.status === "active" ||
      existingCode.activeDate ||
      existingCode.department
    )
      event.throw(
        500,
        `Mã kích hoạt đã được sử dụng lúc ${moment(
          existingCode.activeDate
        ).format("DD/MM/YYYY hh:mm:ss")}`
      );
    return true;
  },
};
