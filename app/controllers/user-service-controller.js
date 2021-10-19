const axios = require("axios");
const {logError, logInfo} = require("../utils/log");

exports.getUsers = (req, response) => {
  logInfo("Getting users from user service");

  axios.get('https://ubademy-user-service.herokuapp.com/api/users')
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.getUserById = (req, response) => {
  logInfo("Getting user with id: " + req.params.id);

  axios.get("https://ubademy-user-service.herokuapp.com/api/users/" + req.params.id)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        logInfo("Body: ", res.data);
        response.json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.updateUserById = (req, response) => {
  logInfo("Updating user with id: " + req.params.id);

  axios.put("https://ubademy-user-service.herokuapp.com/api/users/" + req.params.id, req.body)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        logInfo("Body: ", res.data);
        response.json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.getCourseCategories = (req, response) => {
  logInfo("Getting course categories");

  axios.get("https://ubademy-user-service.herokuapp.com/api/categories")
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        logInfo("Body: ", res.data);
        response.json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.getUserCourseCategories = (req, response) => {
  logInfo("Getting course categories for user with id: " + req.params.userId);

  axios.get("https://ubademy-user-service.herokuapp.com/api/categories/" + req.params.userId)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        logInfo("Body: ", res.data);
        response.json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.createCategorie = (req, response) => {
  logInfo("Creating categories");

  axios.post("https://ubademy-user-service.herokuapp.com/api/categories", req.body)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        logInfo("Body: ", res.data);
        response.status(201).json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.addCategoryToUser = (req, response) => {
  logInfo("Adding category to user");

  axios.post("https://ubademy-user-service.herokuapp.com/api/categories/user", req.body)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        logInfo("Body: ", res.data);
        response.status(201).json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.createUser = (req, response) => {
  logInfo("Creating user");

  axios.post("https://ubademy-user-service.herokuapp.com/api/users", req.body)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        logInfo("Body: ", res.data);
        response.status(201).json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};
