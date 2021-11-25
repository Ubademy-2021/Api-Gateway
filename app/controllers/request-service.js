const axios = require("axios");
const { logInfo, logError } = require("../utils/log");
const { manageAuthToken } = require("../services/api-gateway-service");

exports.getRequest = (url, response, headers) => {
    manageAuthToken(headers, function(_userEmail, err){
        if (err != null)
          response.status(403).send("User unauthorized");
        else
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
      });
};

exports.getRequestNoAuth = (url, response) => {
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

exports.postRequest = (url, response, body, headers) => {
    manageAuthToken(headers, function(_userEmail, err){
        if (err != null)
          response.status(403).send("User unauthorized");
        else
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
    });
};

exports.postRequestNoAuth = (url, response, body) => {
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

exports.putRequest = (url, response, body, headers) => {
    manageAuthToken(headers, function(_userEmail, err){
        if (err != null)
          response.status(403).send("User unauthorized");
        else         
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
    });
};

exports.putRequestNoAuth = (url, response, body) => {     
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

exports.deleteRequest = (url, response, body, headers) => {
    manageAuthToken(headers, function(_userEmail, err){
        if (err != null)
          response.status(403).send("User unauthorized");
        else
            axios.delete(url, { data: body })
            .then((res) => {
                logInfo(`DELETE request to ${url} got status code: ${res.status}`);
                response.status(200).json(res.data);
            }).catch((error) => {
                if (error.response) {
                    logError(`Error while making DELETE request to ${url} got status code: ${error.response.status}`);
                    response.status(error.response.status).send(error.response.data);
                } else {
                    response.status(400).send(`Error while making DELETE request to ${url}`);
                }
            });
      });
};
