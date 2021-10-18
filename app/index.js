'use strict';

const path = require('path');
const express = require('express');
const userServiceController = require('./controllers/user-service-controller');
const bodyParser = require('body-parser');
const { port } = require('./config')

// App
const app = express();

// API routes
var userServiceRouter = express.Router();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Routing
userServiceRouter.route('/users')
  .get(userServiceController.getUsers)

userServiceRouter.route('/users')
  .post(userServiceController.createUser)

userServiceRouter.route('/users/:id')
  .get(userServiceController.getUserById)

userServiceRouter.route('/users/:id')
  .put(userServiceController.updateUserById)

userServiceRouter.route('/categories')
  .get(userServiceController.getCourseCategories)

userServiceRouter.route('/categories/:userId')
  .get(userServiceController.getUserCourseCategories)

userServiceRouter.route('/categories')
  .post(userServiceController.createCategorie)

userServiceRouter.route('/categories/user')
  .post(userServiceController.addCategoryToUser)

app.use("/api-gateway", userServiceRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);
console.log(`Running on port ${port}`);
