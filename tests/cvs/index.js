const fs = require("fs");
const del = require("del");
const { setupStrapi } = require("../helpers/strapi");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

let app;
let user;

describe("CVS API", function () {
  before(async () => {
    await del("../../.tmp");
    app = await setupStrapi();
  });

  after((done) => {
    const dbSettings = app.config.get("database.connections.default.settings");
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
      .post(`/request-otp/${user.id}`)
      .send({
        userPhone: "0973728668",
        msgContent: "Ma OTP cua ban la: {{otp}}",
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
      .post(`/confirm-register/${user.id}`)
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
  it("request reset password otp", (done) => {
    chai
      .request(app.server)
      .post(`/request-otp/${user.id}`)
      .send({
        userPhone: "0973728668",
        msgContent: "Ma OTP cua ban la: {{otp}}",
        requestType: "reset-password",
      })
      .end((error, response) => {
        const result = response.body;
        console.log(result);
        expect(response).to.have.status(200);
        expect(response).to.have.property("body");
        done();
      });
  });
  it("confirm reset password otp fail", (done) => {
    chai
      .request(app.server)
      .post(`/confirm-password/${user.id}`)
      .send({
        userPhone: "0973728668",
        newPassword: "123123",
        confirmPassword: "123123",
        otp: "270996",
      })
      .end((error, response) => {
        const result = response.body;
        console.log(result);
        expect(response).to.have.status(500);
        expect(response).to.have.property("body");
        done();
      });
  });
  it("confirm reset password otp", (done) => {
    chai
      .request(app.server)
      .post(`/confirm-password/${user.id}`)
      .send({
        userPhone: "0973728668",
        newPassword: "123456",
        confirmPassword: "123456",
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
});
