/* eslint-disable no-undef */
const app = require("../app/index");
const request = require("supertest");

var auth_header = {"firebase_authentication": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1NmMwNDEwZmE1MjFjMTZlNDQ2NWE4ZjVjODU5NjZhNWY1MDk5NGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlyLWF1dGgtOGJiMjgiLCJhdWQiOiJmaXItYXV0aC04YmIyOCIsImF1dGhfdGltZSI6MTYzOTg4ODA3NSwidXNlcl9pZCI6ImJEWWdVTXVqdk9iMmhZd2lOcTlQRml4Z245cDIiLCJzdWIiOiJiRFlnVU11anZPYjJoWXdpTnE5UEZpeGduOXAyIiwiaWF0IjoxNjM5ODg4MDc1LCJleHAiOjE2Mzk4OTE2NzUsImVtYWlsIjoiZnJhbmNvMTBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImZyYW5jbzEwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.QelgoFA4mR7yVA36ui5tZDKUAkU6jqEx62uFx6i6jq-jjEGCbOyss3jyy2Jg-f1gYTtJsdGh3j7VsZVWYi6oaU2TY0UQKXWigsUudt_IER6RHK1cdSWrQ77rJV6pPcWqY3oihizONyliXt-X00ZAyi8DtRyY4sG6ZFZqyrrshqSb0QWN4tIPSmghtkmhmLrSNHcIqzJ-j0Whv531HOYYWmzveCoKhmBR75pGmtFpS_e-AleE4Sn3ONxyAMjnhfknJ0GTYEvOpLnz9iTyC-pZwUf8bf8bU6BXmHCCjUrqPAacvg-WF4m8gt25-_7qgrmPZ-tg7irLZwOLyEhjIZX7eA"};


// ***************** USER SERVICE *****************


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

test("Get user's favourites courses should response 200", () => {
  return request(app).get("/api-gateway/users/favorites/1").set(auth_header).then(response => {
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


// ***************** EXAM SERVICE *****************


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
