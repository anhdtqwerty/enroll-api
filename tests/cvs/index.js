const fs = require("fs");
const del = require("del");
const { setupStrapi } = require("../helpers/strapi");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

let app;
let user;
let activeCode;

module.exports = {
  execute: () => {
    describe("CVS API", function () {
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
      it("create an user", (done) => {
        chai
          .request(app.server)
          .post("/auth/local/register")
          .send({
            email: "tungunity96@gmail.com",
            password: "123123",
            username: "0973728668",
          })
          .end((error, response) => {
            const result = response.body;
            user = result.user;
            expect(response).to.have.status(200);
            expect(response).to.have.property("body");
            expect(result.user.email).to.equal("tungunity96@gmail.com");
            done();
          });
      });
      it("request register otp", (done) => {
        chai
          .request(app.server)
          .post(`/request-otp`)
          .send({
            userPhone: "0973728668",
            requestType: "register",
          })
          .end((error, response) => {
            const result = response.body;
            console.log(result);
            expect(response).to.have.status(200);
            expect(response).to.have.property("body");
            done();
          });
      });
      it("confirm register otp", (done) => {
        chai
          .request(app.server)
          .post(`/confirm-register`)
          .send({
            userPhone: "0973728668",
            otp: "270996",
          })
          .end((error, response) => {
            const result = response.body;
            console.log(result);
            expect(response).to.have.status(200);
            expect(response).to.have.property("body");
            done();
          });
      });
      // it("request reset password otp", (done) => {
      //   chai
      //     .request(app.server)
      //     .post(`/request-otp`)
      //     .send({
      //       userPhone: "0973728668",
      //       requestType: "reset-password",
      //     })
      //     .end((error, response) => {
      //       const result = response.body;
      //       expect(response).to.have.status(200);
      //       expect(response).to.have.property("body");
      //       done();
      //     });
      // });
      // it("confirm reset password otp", (done) => {
      //   chai
      //     .request(app.server)
      //     .post(`/confirm-reset-password/${user.username}`)
      //     .send({
      //       otp: "270996",
      //     })
      //     .end((error, response) => {
      //       const result = response.body;
      //       expect(response).to.have.status(200);
      //       expect(response).to.have.property("body");
      //       done();
      //     });
      // });
      // it("change password", (done) => {
      //   chai
      //     .request(app.server)
      //     .put(`/change-password/${user.username}`)
      //     .send({
      //       newPassword: "123456",
      //       confirmNewPassword: "123456",
      //     })
      //     .end((error, response) => {
      //       const result = response.body;
      //       expect(response).to.have.status(200);
      //       expect(response).to.have.property("body");
      //       done();
      //     });
      // });
      this.timeout(20000);
      it("create cv", async () => {
        activeCode = await strapi.services["active-code"].create({
          code: "11111111",
          grade: "Khối 6",
        });
        const response = await chai
          .request(app.server)
          .post(`/cvs/${activeCode.code}`)
          .send({
            userPhone: user.username,
          });
        const result = response.body;
        expect(response).to.have.status(200);
        expect(response).to.have.property("body");
      });
      it("update cv", async () => {
        const response = await chai
          .request(app.server)
          .put(`/cvs/${activeCode.code}`)
          .send({
            userPhone: user.username,
            department: "Cơ sở 1",
            submitType: "complete-step",
          });
        const result = response.body;
        console.log(result);
        expect(response).to.have.status(200);
        expect(response).to.have.property("body");
      });
      it("check system time", async () => {
        const response = await chai
          .request(app.server)
          .post("/checkSystemTime")
          .send({
            grade: "Khối 6",
          });
        const result = response.body;
        console.log(result);
        expect(response).to.have.status(200);
        expect(response).to.have.property("body");
      });
    });
  },
};
