const axios = require("axios");
const { base_course_service_url } = require("../config");
const { logError, logInfo } = require("../utils/log");

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

  axios.get(url)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.json(res.data);
      }).catch((err) => {
        logError(err);
        response.status(400).send(err);
      });
};

exports.createCourse = (req, response) => {
  logInfo("Creating course");

  axios.post(`${base_course_service_url}/api/courses`, req.body)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.status(201).json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.updateCourseById = (req, response) => {
  logInfo("Updating course with id: " + req.params.course_id);

  axios.put(`${base_course_service_url}/api/courses/` + req.params.course_id, req.body)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.cancelCourse = (req, response) => {
  logInfo("Cancelling course with id: " + req.params.course_id);

  var url = `${base_course_service_url}/api/courses/cancel/` + req.params.course_id;

  axios.post(url)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.status(201).json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.getSuscriptions = (req, response) => {
  logInfo("Getting all suscriptions");

  axios.get(`${base_course_service_url}/api/suscriptions`)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.createSuscription = (req, response) => {
  logInfo("Creating suscription");

  axios.post(`${base_course_service_url}/api/suscriptions`, req.body)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.status(201).json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.getSuscriptionById = (req, response) => {
  logInfo("Getting suscription with id: " + req.params.suscription_id);

  var url = `${base_course_service_url}/api/suscriptions/` + req.params.suscription_id;

  axios.get(url)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.json(res.data);
      }).catch((err) => {
        logError(err);
        response.status(400).send(err);
      });
};

exports.addCourseToSuscription = (req, response) => {
  logInfo("Add course with id " + req.body["courseId"] + " to suscription with id: " + req.body["suscriptionId"]);

  axios.post(`${base_course_service_url}/api/suscriptions/course`, req.body)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.status(201).json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.createCollaborator = (req, response) => {
  logInfo("Adding collaborator with id: " + req.body["userId"] + " to course with id: " +
    req.body["courseId"]);
  
  axios.post(`${base_course_service_url}/api/collaborators`, req.body)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.status(201).json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.getCourseCollaborator = (req, response) => {
  logInfo("Getting collaborators for course with id: " + req.params.course_id);

  axios.get(`${base_course_service_url}/api/collaborators/` + req.params.course_id)
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

  axios.post(`${base_course_service_url}/api/categories`, req.body)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.status(201).json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.getCategories = (req, response) => {
  logInfo("Getting all categories");

  axios.get(`${base_course_service_url}/api/categories`)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};

exports.getCourseRecommendation = (req, response) => {
  logInfo("Getting course recommendations for user with id: " + req.params.userId);

  axios.get(`${base_course_service_url}/api/courses/recommendation/` + req.params.userId)
      .then((res) => {
        logInfo(`Status: ${res.status}`);
        response.json(res.data);
      }).catch((err) => {
        logError(err.response.data.detail);
        response.status(400).send(err.response.data.detail);
      });
};
