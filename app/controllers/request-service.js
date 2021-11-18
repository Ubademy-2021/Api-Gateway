const axios = require("axios");
const { logInfo, logError } = require("../utils/log");

exports.getRequest = (url, response) => {
    axios.get(url)
      .then((res) => {
        logInfo(`GET request to ${url} got status code: ${res.status}`);
        response.status(200).json(res.data);
      }).catch((error) => {
        if (error.response) {
            logError(`Error while making GET request to ${url} got status code: ${error.response.status}`);
            response.status(error.response.status).send(error.response.data);
        } else {
            response.status(400).send(`Error while making GET request to ${url}`);
        }
      });
};

exports.postRequest = (url, response, body) => {
    axios.post(url, body)
    .then((res) => {
        logInfo(`POST request to ${url} got status code: ${res.status}`);
        response.status(201).json(res.data);
    }).catch((error) => {
        if (error.response) {
            logError(`Error while making POST request to ${url} got status code: ${error.response.status}`);
            response.status(error.response.status).send(error.response.data);
        } else {
            response.status(400).send(`Error while making POST request to ${url}`);
        }
    });
};

exports.putRequest = (url, response, body) => {
    axios.put(url, body)
    .then((res) => {
        logInfo(`PUT request to ${url} got status code: ${res.status}`);
        response.status(200).json(res.data);
    }).catch((error) => {
        if (error.response) {
            logError(`Error while making PUT request to ${url} got status code: ${error.response.status}`);
            response.status(error.response.status).send(error.response.data);
        } else {
            response.status(400).send(`Error while making PUT request to ${url}`);
        }
    });
};
