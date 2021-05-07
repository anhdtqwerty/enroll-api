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
    if (existingCode.status === "disabled")
      throw strapi.errors.badRequest(
        "Mã kích hoạt đã bị vô hiệu hoá bởi Admin"
      );
    if (!existingCode)
      throw strapi.errors.badRequest("Mã kích hoạt không tồn tại");
    if (!isCodeValid(code))
      throw strapi.errors.badRequest("Mã kích hoạt không hợp lệ");
    if (existingCode.grade !== "Khối 6" && existingCode.grade !== "Khối 10")
      throw strapi.errors.badRequest("Mã kích hoạt không hợp lệ");
    if (existingCode.status === "active" || existingCode.activeDate)
      throw strapi.errors.badRequest(
        `Mã kích hoạt ${existingCode.code} đã được sử dụng`
      );
    return true;
  },
  async disableActiveCode(event) {
    const code = event.params.code;
    console.log("vao day roi");
    if (!code) throw strapi.errors.badRequest("Mã kích hoạt không tồn tại");
    const existingCode = await strapi.services["active-code"].findOne({
      code: code,
    });
    if (!existingCode)
      throw strapi.errors.badRequest("Mã kích hoạt không tồn tại");
    await strapi.services["active-code"].update(
      { id: existingCode.id },
      {
        status: "disabled",
        data: {
          lastStatus: existingCode.status,
        },
      }
    );
    const existingCV = await strapi.services.cv.findOne({
      code: code,
    });
    if (existingCV) {
      await strapi.services.cv.update(
        { id: existingCV.id },
        {
          status: "disabled",
          studyRecord: {
            ...existingCV.studyRecord,
            lastStatus: existingCV.status,
          },
        }
      );
    }
    return "Vô hiệu hoá Mã kích hoạt hoặc Hồ sơ thành công!";
  },
  async enableActiveCode(event) {
    const code = event.params.code;
    if (!code) throw strapi.errors.badRequest("Mã kích hoạt không tồn tại");
    const existingCode = await strapi.services["active-code"].findOne({
      code: code,
    });
    if (!existingCode)
      throw strapi.errors.badRequest("Mã kích hoạt không tồn tại");
    await strapi.services["active-code"].update(
      { id: existingCode.id },
      {
        status: existingCode.data.lastStatus || "inactive",
      }
    );
    const existingCV = await strapi.services.cv.findOne({
      code: code,
    });
    if (existingCV) {
      await strapi.services.cv.update(
        { id: existingCV.id },
        {
          status: existingCV.studyRecord.lastStatus || "created",
        }
      );
    }
    return "Bật Mã kích hoạt hoặc Hồ sơ thành công!";
  },
};
