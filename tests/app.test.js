const fs = require("fs");
const { setupStrapi } = require("./helpers/strapi");
const chai = require("chai");
const expect = chai.expect;

before((done) => {
  setupStrapi();
  done();
});

after((done) => {
  const dbSettings = strapi.config.get("database.connections.default.settings");
  if (dbSettings && dbSettings.filename) {
    const tmpDbFile = `${__dirname}/../${dbSettings.filename}`;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
  done();
});

it("strapi is defined", (done) => {
  expect(strapi).to.exist;
  done();
});
