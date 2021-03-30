const fs = require("fs");
const del = require("del");
const { setupStrapi } = require("../helpers/strapi");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

let app;
let activeCode;

module.exports = {
  execute: () => {
    describe("Active Code API", function () {
      before(async () => {
        this.timeout(20000);
        await del("./.tmp");
        app = await setupStrapi();
      });

      after((done) => {
        const dbSettings = app.config.get(
          "database.connections.default.settings"
        );
        if (dbSettings && dbSettings.filename) {
          const tmpDbFile = `${__dirname}/../${dbSettings.filename}`;
          if (fs.existsSync(tmpDbFile)) {
            fs.unlinkSync(tmpDbFile);
          }
        }
        done();
      });
      it("create active code success", (done) => {
        chai
          .request(app.server)
          .post(`/active-codes`)
          .send({
            grade: "Khối 6",

          })
          .end((error, response) => {
            const result = response.body;
            activeCode = result;
            console.log(result);
            expect(response).to.have.status(200);
            expect(response).to.have.property("body");
            done();
          });
      });
      it("validate active code fail", (done) => {
        chai
          .request(app.server)
          .post(`/active-codes/validate`)
          .send({
            code: "00000000",
          })
          .end((error, response) => {
            const result = response.body;
            console.log(result);
            expect(response).to.have.status(400);
            expect(response).to.have.property("body");
            done();
          });
      });
      it("validate active code success", (done) => {
        chai
          .request(app.server)
          .post(`/active-codes/validate`)
          .send({
            code: activeCode.code,
          })
          .end((error, response) => {
            const result = response.body;
            console.log(result);
            expect(response).to.have.status(200);
            expect(response).to.have.property("body");
            done();
          });
      });
    });
  },
};
