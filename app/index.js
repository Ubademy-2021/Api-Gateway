'use strict';

const path = require('path');
const express = require('express');
const userServiceController = require('./controllers/user-service-controller');
const bodyParser = require('body-parser');


// Constants
var PORT = process.env.PORT || 8080;
// App
const app = express();

// API routes
var userServiceRouter = express.Router();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Routing
userServiceRouter.route('/users')
  .get(userServiceController.getUsers)


app.use("/api-gateway", userServiceRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT);
console.log(`Running on port ${PORT}`);
