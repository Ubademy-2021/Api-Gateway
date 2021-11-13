"use strict";

// Datadog config: this line must come before importing any instrumented module.
// eslint-disable-next-line no-unused-vars
const tracer = require("dd-trace").init({
  logInjection: true,
  service: "api-gateway"
});

// Swagger imports
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const path = require("path");
const express = require("express");

const userServiceController = require("./controllers/user-service-controller");
const courseServiceController = require("./controllers/course-service-controller");
const apiGatewayController = require("./controllers/api-gateway-controller");

const bodyParser = require("body-parser");
const { port, base_user_service_url } = require("./config");
const { logInfo } = require("./utils/log");

// App
const app = express();

// Middleware
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// API routes
var apiGatewayRouter = express.Router();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// User-Service
apiGatewayRouter.route("/users")
  .get(userServiceController.getUser);

apiGatewayRouter.route("/users")
  .post(userServiceController.createUser);

apiGatewayRouter.route("/users/:id")
  .put(userServiceController.updateUserById);

apiGatewayRouter.route("/users/block/:userId")
  .put(userServiceController.blockUser);

apiGatewayRouter.route("/users/login")
  .get(userServiceController.login);

apiGatewayRouter.route("/categories/:userId")
  .get(userServiceController.getUserCourseCategories);

apiGatewayRouter.route("/categories/user")
  .post(userServiceController.addCategoryToUser);

apiGatewayRouter.route("/admins")
  .get(userServiceController.getAdmins);

apiGatewayRouter.route("/admins")
  .post(userServiceController.createAdmin);

apiGatewayRouter.route("/users/favorites/:userId")
  .get(userServiceController.getFavoriteCourses);

apiGatewayRouter.route("/users/favorites")
  .post(userServiceController.addFavoriteCourse);

apiGatewayRouter.route("/users/favorites")
  .delete(userServiceController.deleteFavoriteCourse);

// Course-Service
apiGatewayRouter.route("/courses")
  .get(courseServiceController.getCourses);

apiGatewayRouter.route("/courses")
  .post(courseServiceController.createCourse);

apiGatewayRouter.route("/courses/:course_id")
  .put(courseServiceController.updateCourseById);

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

apiGatewayRouter.route("/categories")
  .get(courseServiceController.getCategories);

apiGatewayRouter.route("/categories")
  .post(courseServiceController.createCategorie);

apiGatewayRouter.route("/courses/recommendation/:userId")
  .get(courseServiceController.getCourseRecommendation);

apiGatewayRouter.route("/courses/inscription")
  .post(courseServiceController.createCourseInscription);

apiGatewayRouter.route("/courses/students/:courseId")
  .get(courseServiceController.getCourseStudents);

apiGatewayRouter.route("/courses/inscription/cancel")
  .put(courseServiceController.cancelCourseInscription);

apiGatewayRouter.route("/suscriptions/inscription")
  .post(courseServiceController.createSuscriptionInscription);

apiGatewayRouter.route("/suscriptions/inscription/:userId")
  .get(courseServiceController.getUserSuscription);

// Get services up
apiGatewayRouter.route("/services")
  .get(apiGatewayController.getServices);

app.use("/api-gateway", apiGatewayRouter);

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));

app.listen(port);
logInfo(`Running on port ${port}`);
logInfo(`Config var BASE_HEROKU_URL is ${base_user_service_url}`);
