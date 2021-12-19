/* eslint-disable no-undef */
var assert = require("assert");
const app = require("../app/index");
const request = require("supertest");

var auth_header = {"facebook_authentication": "EAAFogA6GZC4cBAG87SOBKPtz25CWq6YQkyulUjiO8ZB6LEBp3LAaUvRqZCdzZAZCB9J1SdPdayfhOvCsKxuxZC127wyqbwGlx3PzKgGZAwOfoV6Apm3eg38lsHroZCasCDIMvQcscJXhoIdPooIspoRpOcaOSYp3DusQ9DMt1i63WaOE4w7pN0oOUreY37GSJcsXdFrMHx2CMU9JHC7c3cpLvLU4kiU8MicNeWd4b3HOVKKktH0K7OAM"};

describe("testing", function() {

    it("should assert testing", function() {
      assert.equal("testing", "testing");
    });
  
  });

test("Get services should response 200", () => {
  return request(app).get("/api-gateway/services?status=up").then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get user should response 200", () => {
  return request(app).get("/api-gateway/users").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get admin should response 200", () => {
  return request(app).get("/api-gateway/admins").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Login user should response 200", () => {
  return request(app).get("/api-gateway/users/login").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get user categories should response 200", () => {
  return request(app).get("/api-gateway/categories/1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});
