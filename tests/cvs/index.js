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

  it("request otp", (done) => {
    chai
      .request(app.server)
      .post(`/request-otp/${user.id}`)
      .send({
        userPhone: "0973728668",
        msgContent: "Ma OTP cua ban la: {{otp}}",
      })
      .end((error, response) => {
        const result = response.body;
        console.log(result);
        expect(response).to.have.status(200);
        expect(response).to.have.property("body");
        done();
      });
  });

  it("confirm otp", (done) => {
    chai
      .request(app.server)
      .post(`/confirm-otp/${user.id}`)
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
});
