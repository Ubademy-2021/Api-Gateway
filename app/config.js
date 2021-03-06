/* eslint-disable no-undef */
module.exports = {
    port: process.env.PORT || 8080,
    log: {
      error: process.env.LOG_ERROR == undefined || process.env.LOG_ERROR == "true",
      warn: process.env.LOG_WARN == undefined || process.env.LOG_WARN == "true",
      info: process.env.LOG_INFO == undefined || process.env.LOG_INFO == "true",
      debug: process.env.LOG_DEBUG == undefined || process.env.LOG_DEBUG == "true",
    },
    base_user_service_url: process.env.BASE_USER_SERVICE_URL || "https://ubademy-user-service.herokuapp.com",
    base_course_service_url: process.env.BASE_COURSE_SERVICE_URL || "https://course-service-ubademy.herokuapp.com",
    base_payments_service_url: process.env.BASE_PAYMENTS_SERVICE_URL || "https://course-service-ubademy.herokuapp.com",
    base_exams_service_url: process.env.BASE_EXAMS_SERVICE_URL || "https://exam-service-ubademy.herokuapp.com",
    services_ubademy: ["Course-Service", "User-Service", "Payments-Service", "Exams-Service"]
  };