const axios = require("axios");
const { base_user_service_url } = require("../config");
const { logError, logInfo } = require("../utils/log");
const { manageAuthToken } = require("../services/api-gateway-service");

exports.getUser = (req, response) => {
  logInfo("Getting users from user service");
  logInfo("Query params - user_id: " + req.query["user_id"]);
  logInfo("Query params - email: " + req.query["email"]);

  var url = `${base_user_service_url}/api/users`;

  if (req.query["user_id"]){
    url = `${base_user_service_url}/api/users?user_id=` + req.query["user_id"];
  } else if (req.query["email"])
    url = `${base_user_service_url}/api/users?email=` + req.query["email"];

  axios.get(url)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.json(res.data);
      }).catch((err) => {
        logError(err);
        response.status(400).send(err);
      });
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

      axios.get(url)
          .then((res) => {
            logInfo(`Status: ${res.status}`);
            response.json(res.data);
          }).catch((err) => {
            logError(err);
            response.status(400).send(err);
          });
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

  axios.get(`${base_user_service_url}/api/categories/` + req.params.userId)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.addCategoryToUser = (req, response) => {
  logInfo("Adding category to user");

  axios.post(`${base_user_service_url}/api/categories/user`, req.body)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.status(201).json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.createUser = (req, response) => {
  logInfo("Creating user");

  axios.post(`${base_user_service_url}/api/users`, req.body)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.status(201).json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.getAdmins = (req, response) => {
  logInfo("Getting all admins");

  axios.get(`${base_user_service_url}/api/admins`)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.createAdmin = (req, response) => {
  logInfo("Creating admin");

  axios.post(`${base_user_service_url}/api/admins`, req.body)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.status(201).json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.getFavoriteCourses = (req, response) => {
  logInfo("Getting favourite courses for user with id: " + req.params.userId);

  axios.get(`${base_user_service_url}/api/users/favorites/` + req.params.userId)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.addFavoriteCourse = (req, response) => {
  logInfo("Adding favorite course " + req.body["courseId"] + " for user with id: " + req.body["userId"]);

  axios.post(`${base_user_service_url}/api/users/favorites`, req.body)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.status(201).json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
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
