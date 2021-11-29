/* eslint-disable no-unused-vars */

const { base_user_service_url } = require("../config");
const { logError, logInfo } = require("../utils/log");
const { manageAuthToken } = require("../services/api-gateway-service");
const { getRequest, postRequest, putRequest, deleteRequest, getRequestNoAuth, postRequestNoAuth, putRequestNoAuth } = require("./request-service");

exports.getUser = (req, response) => {
  logInfo("Getting users from user service");
  logInfo("Query params - user_id: " + req.query["user_id"]);
  logInfo("Query params - email: " + req.query["email"]);

  var url = `${base_user_service_url}/api/users`;

  if (req.query["user_id"]){
    url = `${base_user_service_url}/api/users?user_id=` + req.query["user_id"];
  } else if (req.query["email"])
    url = `${base_user_service_url}/api/users?email=` + req.query["email"];

  getRequest(url, response, req.headers);
};

exports.login = (req, response) => {
  logInfo("Starting login");

  manageAuthToken(req.headers, function(userEmail, err){
    if (err != null){
      logError("Error while handling auth token");
      response.status(404).send("Could not validate user");      
    } else if (userEmail != null) {

      logInfo("Obtained email: " + userEmail + " after token decoding");

      var url = `${base_user_service_url}/api/users?email=` + userEmail;

      getRequest(url, response, req.headers);
    }   
  });
};

exports.updateUserById = (req, response) => {
  logInfo("Updating user with id: " + req.params.id);
  putRequestNoAuth(`${base_user_service_url}/api/users/` + req.params.id, response, req.body);
};

exports.getUserCourseCategories = (req, response) => {
  logInfo("Getting course categories for user with id: " + req.params.userId);
  getRequestNoAuth(`${base_user_service_url}/api/categories/` + req.params.userId, response);
};

exports.addCategoryToUser = (req, response) => {
  logInfo("Adding category to user");
  postRequestNoAuth(`${base_user_service_url}/api/categories/user`, response, req.body);
};

exports.createUser = (req, response) => {
  logInfo("Creating user");
  postRequestNoAuth(`${base_user_service_url}/api/users`, response, req.body);
};

exports.getAdmins = (req, response) => {
  logInfo("Getting admin");
  logInfo("Query params - admin_id: " + req.query["admin_id"]);
  logInfo("Query params - email: " + req.query["email"]);

  var url = `${base_user_service_url}/api/admins`;

  if (req.query["admin_id"]){
    url = `${base_user_service_url}/api/admins?admin_id=` + req.query["admin_id"];
  } else if (req.query["email"])
    url = `${base_user_service_url}/api/admins?email=` + req.query["email"];

  getRequestNoAuth(url, response, req.headers);
};

exports.createAdmin = (req, response) => {
  logInfo("Creating admin");
  postRequestNoAuth(`${base_user_service_url}/api/admins`, response, req.body, req.headers);
};

exports.getFavoriteCourses = (req, response) => {
  logInfo("Getting favourite courses for user with id: " + req.params.userId);
  getRequest(`${base_user_service_url}/api/users/favorites/` + req.params.userId, response, req.headers);
};

exports.addFavoriteCourse = (req, response) => {
  logInfo("Adding favorite course " + req.body["courseId"] + " for user with id: " + req.body["userId"]);
  postRequest(`${base_user_service_url}/api/users/favorites`, response, req.body, req.headers);
};

exports.deleteFavoriteCourse = (req, response) => {
  logInfo("Deleting favorite course " + req.body["courseId"] + " for user with id: " + req.body["userId"]);
  deleteRequest(`${base_user_service_url}/api/users/favorites`, response, req.body, req.headers);
};

exports.blockUser = (req, response) => {
  logInfo("Blocking user with id  " + req.params.userId);
  putRequest(`${base_user_service_url}/api/users/block/` + req.params.userId, response, null, req.headers);
};
