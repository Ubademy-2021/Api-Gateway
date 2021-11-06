const supertest = require("supertest");
const app = require("../app/index");
const requestWithSupertest = supertest(app);

/* eslint-disable no-undef */
var assert = require("assert");

describe("testing", function() {

  it("should assert testing", function() {
    assert.equal("testing", "testing");
  });

});

describe("Api-Gateway Endpoints", () => {

  it("GET all users", async () => {
    requestWithSupertest.get("/api-gateway/users", res => {
      expect(res.status).toEqual(200);
    });
  });

  it("GET all courses", async () => {
    requestWithSupertest.get("/api-gateway/courses", res => {
      expect(res.status).toEqual(200);
    });
  });

});
