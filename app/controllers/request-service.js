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
