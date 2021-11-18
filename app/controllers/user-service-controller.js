const axios = require("axios");
const { base_user_service_url } = require("../config");
const { logError, logInfo } = require("../utils/log");
const { manageAuthToken } = require("../services/api-gateway-service");
const { getRequest, postRequest } = require("./request-service");

exports.getUser = (req, response) => {
  logInfo("Getting users from user service");
  logInfo("Query params - user_id: " + req.query["user_id"]);
  logInfo("Query params - email: " + req.query["email"]);

  var url = `${base_user_service_url}/api/users`;

  if (req.query["user_id"]){
    url = `${base_user_service_url}/api/users?user_id=` + req.query["user_id"];
  } else if (req.query["email"])
    url = `${base_user_service_url}/api/users?email=` + req.query["email"];

  getRequest(url, response);
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

      getRequest(url, response);
    }   
  });
};

exports.updateUserById = (req, response) => {
  logInfo("Updating user with id: " + req.params.id);

  axios.put(`${base_user_service_url}/api/users/` + req.params.id, req.body)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.getUserCourseCategories = (req, response) => {
  logInfo("Getting course categories for user with id: " + req.params.userId);
  getRequest(`${base_user_service_url}/api/categories/` + req.params.userId, response);
};

exports.addCategoryToUser = (req, response) => {
  logInfo("Adding category to user");
  postRequest(`${base_user_service_url}/api/categories/user`, response, req.body);
};

exports.createUser = (req, response) => {
  logInfo("Creating user");
  postRequest(`${base_user_service_url}/api/users`, response, req.body);
};

exports.getAdmins = (req, response) => {
  logInfo("Getting all admins");
  getRequest(`${base_user_service_url}/api/admins`, response);
};

exports.createAdmin = (req, response) => {
  logInfo("Creating admin");
  postRequest(`${base_user_service_url}/api/admins`, response, req.body);
};

exports.getFavoriteCourses = (req, response) => {
  logInfo("Getting favourite courses for user with id: " + req.params.userId);
  getRequest(`${base_user_service_url}/api/users/favorites/` + req.params.userId, response);
};

exports.addFavoriteCourse = (req, response) => {
  logInfo("Adding favorite course " + req.body["courseId"] + " for user with id: " + req.body["userId"]);
  postRequest(`${base_user_service_url}/api/users/favorites`, response, req.body);
};

exports.deleteFavoriteCourse = (req, response) => {
  logInfo("Deleting favorite course " + req.body["courseId"] + " for user with id: " + req.body["userId"]);

  axios.delete(`${base_user_service_url}/api/users/favorites`, { data: req.body })
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.status(201).json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.blockUser = (req, response) => {
  logInfo("Blocking user with id  " + req.params.userId);

  axios.put(`${base_user_service_url}/api/users/block/` + req.params.userId)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.status(201).json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};
