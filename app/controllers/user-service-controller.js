const axios = require("axios");
const { base_heroku_url } = require("../config");
const {logError, logInfo} = require("../utils/log");

exports.getUsers = (req, response) => {
  logInfo("Getting users from user service");

  axios.get(`${base_heroku_url}/api/users`)
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

  axios.get(`${base_heroku_url}/api/users/` + req.params.id)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.updateUserById = (req, response) => {
  logInfo("Updating user with id: " + req.params.id);

  axios.put(`${base_heroku_url}/api/users/` + req.params.id, req.body)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.getCourseCategories = (req, response) => {
  logInfo("Getting course categories");

  axios.get(`${base_heroku_url}/api/categories`)
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

  axios.get(`${base_heroku_url}/api/categories/` + req.params.userId)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.createCategorie = (req, response) => {
  logInfo("Creating categories");

  axios.post(`${base_heroku_url}/api/categories`, req.body)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.status(201).json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.addCategoryToUser = (req, response) => {
  logInfo("Adding category to user");

  axios.post(`${base_heroku_url}/api/categories/user`, req.body)
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

  axios.post(`${base_heroku_url}/api/users`, req.body)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.status(201).json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};
