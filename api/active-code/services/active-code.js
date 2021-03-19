"use strict";
const { isCodeValid } = require("../../utility.js");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  checkActiveCode: async (code) => {
    const existingCode = await strapi.services["active-code"].findOne({
      code: code,
    });
    if (isCodeValid(code)) return false;
    if (!existingCode) return false;
    if (existingCode.grade !== "Khối 6" && existingCode.grade !== "Khối 10")
      return false;
    if (
      existingCode.status === "active" ||
      existingCode.activeDate ||
      existingCode.department
    )
      return false;
    return true;
  },
};
