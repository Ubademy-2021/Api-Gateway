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
const bodyParser = require("body-parser");
const { port, base_user_service_url } = require("./config");
const { logInfo } = require("./utils/log");

// App
const app = express();

// API routes
var apiGatewayRouter = express.Router();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Routing
apiGatewayRouter.route("/users")
  .get(userServiceController.getUsers);

apiGatewayRouter.route("/users")
  .post(userServiceController.createUser);

apiGatewayRouter.route("/users/:id")
  .get(userServiceController.getUserById);

apiGatewayRouter.route("/users/:id")
  .put(userServiceController.updateUserById);

apiGatewayRouter.route("/categories")
  .get(userServiceController.getCourseCategories);

apiGatewayRouter.route("/categories/:userId")
  .get(userServiceController.getUserCourseCategories);

apiGatewayRouter.route("/categories")
  .post(userServiceController.createCategorie);

apiGatewayRouter.route("/categories/user")
  .post(userServiceController.addCategoryToUser);

app.use("/api-gateway", apiGatewayRouter);

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));

app.listen(port);
logInfo(`Running on port ${port}`);
logInfo(`Config var BASE_HEROKU_URL is ${base_user_service_url}`);
