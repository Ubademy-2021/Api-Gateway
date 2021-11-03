"use strict";

// Datadog config: this line must come before importing any instrumented module.
// eslint-disable-next-line no-unused-vars
const tracer = require("dd-trace").init({
  logInjection: true,
  service: "api-gateway"
});

const path = require("path");
const express = require("express");

const userServiceController = require("./controllers/user-service-controller");
const courseServiceController = require("./controllers/course-service-controller");

const bodyParser = require("body-parser");
const { port, base_user_service_url } = require("./config");
const { logInfo } = require("./utils/log");

// App
const app = express();

// API routes
var apiGatewayRouter = express.Router();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// User-Service
apiGatewayRouter.route("/users")
  .post(userServiceController.createUser);

apiGatewayRouter.route("/users")
  .get(userServiceController.getUser);

apiGatewayRouter.route("/users/:id")
  .put(userServiceController.updateUserById);

apiGatewayRouter.route("/users/login")
    .get(userServiceController.login);

apiGatewayRouter.route("/categories")
  .get(userServiceController.getCourseCategories);

apiGatewayRouter.route("/categories/:userId")
  .get(userServiceController.getUserCourseCategories);

apiGatewayRouter.route("/categories")
  .post(userServiceController.createCategorie);

apiGatewayRouter.route("/categories/user")
  .post(userServiceController.addCategoryToUser);

apiGatewayRouter.route("/admins")
  .get(userServiceController.getAdmins);

apiGatewayRouter.route("/admins")
  .post(userServiceController.createAdmin);

// Course-Service
apiGatewayRouter.route("/courses")
  .get(courseServiceController.getCourses);

apiGatewayRouter.route("/courses")
  .post(courseServiceController.createCourse);

apiGatewayRouter.route("/courses/:course_id")
  .get(courseServiceController.getCourseById);

apiGatewayRouter.route("/courses/:course_id")
  .put(courseServiceController.updateCourseById);

apiGatewayRouter.route("/courses/suscription/:suscription_id")
  .get(courseServiceController.getCoursesFromSuscription);

apiGatewayRouter.route("/courses/cancel/:course_id")
  .post(courseServiceController.cancelCourse);

apiGatewayRouter.route("/suscriptions")
  .get(courseServiceController.getSuscriptions);

apiGatewayRouter.route("/suscriptions")
  .post(courseServiceController.createSuscription);

apiGatewayRouter.route("/suscriptions/:suscription_id")
  .get(courseServiceController.getSuscriptionById);

apiGatewayRouter.route("/suscriptions/course")
  .post(courseServiceController.addCourseToSuscription);

apiGatewayRouter.route("/collaborators")
  .post(courseServiceController.createCollaborator);

apiGatewayRouter.route("/collaborators/:course_id")
  .get(courseServiceController.getCourseCollaborator);

app.use("/api-gateway", apiGatewayRouter);

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));

app.listen(port);
logInfo(`Running on port ${port}`);
logInfo(`Config var BASE_HEROKU_URL is ${base_user_service_url}`);
