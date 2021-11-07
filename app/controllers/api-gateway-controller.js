const { logInfo } = require("../utils/log");
const { services_ubademy } = require("../config");

exports.getServices = (req, response) => {
    logInfo("Getting all services");
    
    if (!req.query["status"])
        response.json(services_ubademy);
};
