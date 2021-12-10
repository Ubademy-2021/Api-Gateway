const { base_course_service_url } = require("../config");
const { logInfo } = require("../utils/log");
const { getRequest, postRequest, putRequest, getRequestNoAuth } = require("./request-service");

exports.getCourses = (req, response) => {
  logInfo("Getting courses from course service");
  logInfo("Query params - course_id: " + req.query["course_id"]);
  logInfo("Query params - suscription_id: " + req.query["suscription_id"]);
  logInfo("Query params - category_id: " + req.query["category_id"]);
  logInfo("Query params - active: " + req.query["active"]);
  logInfo("Query params - user_id: " + req.query["user_id"]);

  var url = `${base_course_service_url}/api/courses`;

  if (req.query["course_id"]){
    url = `${base_course_service_url}/api/courses?course_id=` + req.query["course_id"];
    logInfo("Url formed:" + url);
  } else if (req.query["suscription_id"]) {
    url = `${base_course_service_url}/api/courses?suscription_id=` + req.query["suscription_id"];
    logInfo("Url formed:" + url);
  } else if (req.query["category_id"]) {
    url = `${base_course_service_url}/api/courses?category_id=` + req.query["category_id"];
    logInfo("Url formed:" + url);
  } else if (req.query["active"] == "true") {
    url = `${base_course_service_url}/api/courses?active=true`;
    logInfo("Url formed:" + url);
  } else if (req.query["user_id"]) {
    url = `${base_course_service_url}/api/courses?user_id=` + req.query["user_id"];
    logInfo("Url formed:" + url);
  }

  getRequest(url, response, req.headers);
};

exports.createCourse = (req, response) => {
  logInfo("Creating course");
  postRequest(`${base_course_service_url}/api/courses`, response, req.body, req.headers);
};

exports.updateCourseById = (req, response) => {
  logInfo("Updating course with id: " + req.params.course_id);
  putRequest(`${base_course_service_url}/api/courses/` + req.params.course_id, response, req.body, req.headers);
};

exports.cancelCourse = (req, response) => {
  logInfo("Cancelling course with id: " + req.params.course_id);
  putRequest(`${base_course_service_url}/api/courses/cancel/` + req.params.course_id, response, req.body, req.headers);
};

exports.getSuscriptions = (req, response) => {
  logInfo("Getting all suscriptions");
  getRequest(`${base_course_service_url}/api/suscriptions`, response, req.headers);
};

exports.createSuscription = (req, response) => {
  logInfo("Creating suscription");
  postRequest(`${base_course_service_url}/api/suscriptions`, response, req.body, req.headers);
};

exports.getSuscriptionById = (req, response) => {
  logInfo("Getting suscription with id: " + req.params.suscription_id);
  getRequest(`${base_course_service_url}/api/suscriptions/` + req.params.suscription_id, response, req.headers);
};

exports.addCourseToSuscription = (req, response) => {
  logInfo("Add course with id " + req.body["courseId"] + " to suscription with id: " + req.body["suscriptionId"]);
  postRequest(`${base_course_service_url}/api/suscriptions/course`, response, req.body, req.headers);
};

exports.createCollaborator = (req, response) => {
  logInfo("Adding collaborator with id: " + req.body["userId"] + " to course with id: " + req.body["courseId"]);
  postRequest(`${base_course_service_url}/api/collaborators`, response, req.body, req.headers);
};

exports.getCourseCollaborator = (req, response) => {
  logInfo("Getting collaborators for course with id: " + req.params.course_id);
  getRequest(`${base_course_service_url}/api/collaborators/` + req.params.course_id, response, req.headers);
};

exports.createCategorie = (req, response) => {
  logInfo("Creating categories");
  postRequest(`${base_course_service_url}/api/categories`, response, req.body, req.headers);
};

exports.getCategories = (req, response) => {
  logInfo("Getting all categories");
  getRequestNoAuth(`${base_course_service_url}/api/categories`, response, req.headers);
};

exports.getCourseRecommendation = (req, response) => {
  logInfo("Getting course recommendations for user with id: " + req.params.userId);
  getRequest(`${base_course_service_url}/api/courses/recommendation/` + req.params.userId, response, req.headers);
};

exports.createCourseInscription = (req, response) => {
  logInfo("Creating course inscription");
  postRequest(`${base_course_service_url}/api/courses/inscription`, response, req.body, req.headers);
};

exports.getCourseStudents = (req, response) => {
  logInfo("Getting course students for course id: " + req.params.courseId);
  getRequest(`${base_course_service_url}/api/courses/students/` + req.params.courseId, response, req.headers);
};

exports.cancelCourseInscription = (req, response) => {
  logInfo("Cancelling course " + req.body["courseId"] + " suscription for user id: " + req.body["userId"]);
  putRequest(`${base_course_service_url}/api/courses/inscription/cancel`, response, req.body, req.headers);
};

exports.createSuscriptionInscription = (req, response) => {
  logInfo("Creating inscription to suscription id: " + req.body["suscriptionId"]);
  postRequest(`${base_course_service_url}/api/suscriptions/inscription`, response, req.body, req.headers);
};

exports.getUserSuscription = (req, response) => {
  logInfo("Getting suscriptions for user id: " + req.params.userId);
  getRequest(`${base_course_service_url}/api/suscriptions/inscription/` + req.params.userId, response, req.headers);
};

exports.addCategoryToCourse = (req, response) => {
  logInfo("Adding category " + req.body["categoryId"] + " to course " + req.body["courseId"]);
  postRequest(`${base_course_service_url}/api/courses/category`, response, req.body, req.headers);
};
