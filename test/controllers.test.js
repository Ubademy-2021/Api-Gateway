/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const app = require("../app/index");
const request = require("supertest");

var auth_header = {"firebase_authentication": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjcxMTQzNzFiMmU4NmY4MGM1YzYxNThmNDUzYzk0NTEyNmZlNzM5Y2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlyLWF1dGgtOGJiMjgiLCJhdWQiOiJmaXItYXV0aC04YmIyOCIsImF1dGhfdGltZSI6MTY0MDEyNzQzMSwidXNlcl9pZCI6IkJSSGxrcWpHYm5YTVZ6dE5EMFMyUVhLckoyYjIiLCJzdWIiOiJCUkhsa3FqR2JuWE1WenRORDBTMlFYS3JKMmIyIiwiaWF0IjoxNjQwMTI3NDMxLCJleHAiOjE2NDAxMzEwMzEsImVtYWlsIjoiZGFtaWFuMTFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImRhbWlhbjExQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.guUKcMf_XAtJNtn6821JqVo1fcXjpICg6YIRxDcmB-bes6GfgPqNawAnRPux9kVQyn-yyqBHKEifwCDuEy8QAHTq0UxFKqT4UtS5M9HJcmL02A1aBl9nOqixc_ohf0tnV6aWSxo5agaX8qToUORd19mjnkUmRQwEbBoTyerse2a22rOnApUxjeIx7qLNoiWX77ccBLhpFQHCacQy2ca7-VUZQ4Q_oOnjT1FxuvTkQ02dCS3YgBD-txIwhxs4IEP3yHP9x-p0zTcXwnV0wmwVUSAkEHeV77II4drlsXum3f3EMO8EPt7AKiLhjyDYLhh0PbKW3w8pFDTiBO8Swbo_fg"};
var content_type = {"Content-Type":"application/json"};
var auth_header_admin = {"admin_authentication":"test"};


// ***************** API GATEWAY SERVICE *****************


test("Get services up should response 200", () => {
  return request(app).get("/api-gateway/services?status=up").then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get services should response 200", () => {
  return request(app).get("/api-gateway/services").then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});


// ***************** USER SERVICE *****************


test("Get user should response 200", () => {
  return request(app).get("/api-gateway/users").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get user by id should response 200", () => {
  return request(app).get("/api-gateway/users?user_id=1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get user by email should response 200", () => {
  return request(app).get("/api-gateway/users?user_email=franco10@gmail.com").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Update user by id should response 200", () => {
  return request(app).put("/api-gateway/users/1").set(auth_header).set(content_type).send({
    "email": "fmariottii@fi.uba.ar",
    "userName": "fmariottiti",
    "name": "Franco",
    "surname": "Mariottiiii",
    "phoneNumber": "1150464022",
    "city": "San Isidro",
    "state": "buenos aires",
    "country": "Argentina",
    "address": "juncal capital 1234"
  }).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Block user should response 200", () => {
  return request(app).put("/api-gateway/users/block/1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Block user already blocked should response 404", () => {
  return request(app).put("/api-gateway/block/1").set(auth_header).then(response => {    
    expect(response.statusCode).toBe(404);
    app.close();
  });
});

test("Unblock user should response 200", () => {
  return request(app).put("/api-gateway/users/unblock/1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Unblock user already unblocked should response 400", () => {
  return request(app).put("/api-gateway/users/unblock/1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(400);
    app.close();
  });
});

test("Get admin should response 200", () => {
  return request(app).get("/api-gateway/admins").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Login admin with fake token response 404", () => {
  return request(app).get("/api-gateway/admins/login").set(auth_header_admin).then(response => {
    expect(response.statusCode).toBe(404);
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

test("Get user's favourites courses should response 200", () => {
  return request(app).get("/api-gateway/users/favorites/1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Add favorite course for user should response 201", () => {
  return request(app).post("/api-gateway/users/favorites").set(auth_header).set(content_type).send({
    "userId": 1,
    "courseId": 1
  }).then(response => {
    expect(response.statusCode).toBe(201);
    app.close();
  });
});

test("Delete favorite course for user should response 201", () => {
  return request(app).delete("/api-gateway/users/favorites").set(auth_header).set(content_type).send({
    "userId": 1,
    "courseId": 1
  }).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});


// ***************** COURSE SERVICE *****************


test("Get all courses should response 200", () => {
  return request(app).get("/api-gateway/courses").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get course by id should response 200", () => {
  return request(app).get("/api-gateway/courses?course_id=1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get course by suscription should response 200", () => {
  return request(app).get("/api-gateway/courses?suscription_id=1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get course by category should response 200", () => {
  return request(app).get("/api-gateway/courses?category_id=1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get active courses should response 200", () => {
  return request(app).get("/api-gateway/courses?active=true").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get courses for user should response 200", () => {
  return request(app).get("/api-gateway/courses?user_id=1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get courses for owner should response 200", () => {
  return request(app).get("/api-gateway/courses?owner_id=1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get courses for collaborator should response 200", () => {
  return request(app).get("/api-gateway/courses?collaborator_id=1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get suscription by id should response 200", () => {
  return request(app).get("/api-gateway/suscriptions/1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get collaborators for course should response 200", () => {
  return request(app).get("/api-gateway/collaborators/1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get all categories should response 200", () => {
  return request(app).get("/api-gateway/categories").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Cancel course already cancelled should response 400", () => {
  request(app).put("/api-gateway/courses/cancel/1").set(auth_header);
  return request(app).put("/api-gateway/courses/cancel/1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(400);
    app.close();
  });
});

test("Get course recommendations for user should response 200", () => {
  return request(app).get("/api-gateway/courses/recommendation/1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get students by course should response 200", () => {
  return request(app).get("/api-gateway/courses/students/1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get suscription inscription for user should response 200", () => {
  return request(app).get("/api-gateway/suscriptions/inscription/1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Create course inscription for user by should response 201", () => {
  return request(app).post("/api-gateway/courses/inscription").set(auth_header).set(content_type).send({
    "courseId": 1,
    "userId": 1
  }).then(response => {
    expect(response.statusCode).toBe(201);
    app.close();
  });
});

test("Cancel course inscription for user by should response 200", () => {
  return request(app).put("/api-gateway/courses/inscription/cancel").set(auth_header).set(content_type).send({
    "courseId": 1,
    "userId": 1
  }).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Create category that already exists should response 400", () => {
  return request(app).post("/api-gateway/categories").set(auth_header).set(content_type).send({
    "name": "test2"
  }).then(response => {
    request(app).post("/api-gateway/categories").set(auth_header).set(content_type).send({
      "name": "test2"}).
    then(response => {
      expect(response.statusCode).toBe(400);
      app.close();
    });
  });
});

test("Add category that already exists to course should response 404", () => {
  return request(app).post("/api-gateway/courses/categories").set(auth_header).set(content_type).send({
    "courseId": 1,
    "categoryId": 1
  }).then(response => {
    request(app).post("/api-gateway/courses/categories").set(auth_header).set(content_type).send({
      "courseId": 1,
      "categoryId": 1
    }).
    then(response => {
      expect(response.statusCode).toBe(404);
      app.close();
    });
  });
});

// // ***************** EXAM SERVICE *****************


test("Get exams should response 200", () => {
  return request(app).get("/api-gateway/exams?courseId=1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get solutions should response 200", () => {
  return request(app).get("/api-gateway/solutions?courseId=1&examNumber=1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Get solutions for user should response 200", () => {
  return request(app).get("/api-gateway/solutions?userId=1&courseId=1&examNumber=1").set(auth_header).then(response => {
    expect(response.statusCode).toBe(200);
    app.close();
  });
});

test("Create solution that already exists for exam should response 400", () => {
  request(app).post("/api-gateway/solutions").set(auth_header).set(content_type).send({
    "courseId": 1,
    "examNumber": 1,
    "userId": 1,
    "answers": [
      {
        "number": 1,
        "answer": "string"
      }
    ]
  });

  return request(app).post("/api-gateway/solutions").set(auth_header).set(content_type).send({
    "courseId": 1,
    "examNumber": 1,
    "userId": 1,
    "answers": [
      {
        "number": 1,
        "answer": "string"
      }
    ]
  }).then(response => {
    expect(response.statusCode).toBe(400);
    app.close();
  });
});
