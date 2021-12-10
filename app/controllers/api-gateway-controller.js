const { logError, logInfo } = require("../utils/log");
const { services_ubademy, base_payments_service_url, base_exams_service_url } = require("../config");
const { base_user_service_url, base_course_service_url } = require("../config");
const axios = require("axios");

exports.getServices = async (req, response) => {
    /* #swagger.parameters['status'] = {
            in: 'query',
            description: "Services status",
            required: false,
    } */

    logInfo("Getting all services");
    
    var services = [];

    if (req.query["status"]){
        if (req.query["status"] == "up") {
            logInfo("Getting services with status up");

            await axios.get(`${base_user_service_url}/ping`)
                .then((res) => {
                    if (res["data"] == "pong")
                        logInfo("User Service is up!");

                        services.push("User-Service");
                }).catch((err) => {
                    logError("User service is not up");
                    logError("Error when trying to reach User Service: " + err);
                });

            await axios.get(`${base_course_service_url}/ping`)
                .then((res) => {
                    if (res["data"] == "pong")
                        logInfo("Course Service is up!");
                        
                        services.push("Course-Service");
                }).catch((err) => {
                    logError("Course service is not up");
                    logError("Error when trying to reach Course Service: " + err);
                });
            
            await axios.get(`${base_payments_service_url}/ping`)
                .then((res) => {
                    if (res["data"] == "pong")
                        logInfo("Payments Service is up!");
                        
                        services.push("Payments-Service");
                }).catch((err) => {
                    logError("Payments service is not up");
                    logError("Error when trying to reach Payments Service: " + err);
                });

            await axios.get(`${base_exams_service_url}/ping`)
                .then((res) => {
                    if (res["data"] == "pong")
                        logInfo("Exams Service is up!");
                        
                        services.push("Exams-Service");
                }).catch((err) => {
                    logError("Exams service is not up");
                    logError("Error when trying to reach Exams Service: " + err);
                });
        }
        
        // Return array of services with status up
        response.json(services);
    } else {
        // Return array of all services with no filter
        response.json(services_ubademy);
    }
};
