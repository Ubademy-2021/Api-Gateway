/* eslint-disable no-undef */
var assert = require("assert");
const app = require("../app/index");
const request = require("supertest");

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