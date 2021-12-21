const { logInfo } = require("../utils/log");
const { base_exams_service_url } = require("../config");
const { getRequest, postRequest, putRequest } = require("./request-service");

exports.getExam = (req, response) => {
    logInfo("Getting exam for course id: " + req.query["courseId"]);
    getRequest(`${base_exams_service_url}/api/exams?courseId=` + req.query["courseId"], response, req.headers);
};

exports.editExam = (req, response) => {
    logInfo("Editing exam for course id: " + req.body["courseId"]);
    putRequest(`${base_exams_service_url}/api/exams`, response, req.body, req.headers);
};

exports.publishExam = (req, response) => {
    logInfo("Publishing exam " + req.query["examNumber"] + "for course id: " + req.query["courseId"]);
    putRequest(`${base_exams_service_url}/api/exams/publish?courseId=`+req.query["courseId"]+"&examNumber="+req.query["examNumber"], response, req.body, req.headers);
};

exports.createExam = (req, response) => {
    logInfo("Creating exam");
    postRequest(`${base_exams_service_url}/api/exams`, response, req.body, req.headers);
};

exports.createQuestion = (req, response) => {
    logInfo("Creating question for course id " + req.body["courseId"] + " and exam " + req.body["examNumber"]);
    postRequest(`${base_exams_service_url}/api/exams/questions`, response, req.body, req.headers);
};

exports.getSolution = (req, response) => {
    logInfo("Getting solution for user id: " + req.query["userId"]);

    var url = "";

    if (req.query["user_id"]){
        url = `${base_exams_service_url}/api/solutions?userId=` + req.query["userId"] +
        "&courseId=" + req.query["courseId"] + 
        "&examNumber=" + req.query["examNumber"];
    } else {
        url = `${base_exams_service_url}/api/solutions?courseId=` + req.query["courseId"] + 
        "&examNumber=" + req.query["examNumber"];
    }

    getRequest(url, response, req.headers);
};

exports.createSolution = (req, response) => {
    logInfo("Creating solution for user id: " + req.body["userId"] + " and exam number " + req.body["examNumber"]);
    postRequest(`${base_exams_service_url}/api/solutions`, response, req.body, req.headers);
};

exports.correctExam = (req, response) => {
    logInfo("Correcting exam " + req.body["examNumber"] + " of user " + req.body["userId"]);
    postRequest(`${base_exams_service_url}/api/solutions/corrections`, response, req.body, req.headers);
};
