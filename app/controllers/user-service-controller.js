const serialize = require('serialize-javascript');
const deserialize = str => eval(`(${str})`);
const axios = require('axios');

exports.getUsers = (req, response) => { 
  console.log("Getting users from user service")

  axios.get('https://ubademy-user-service.herokuapp.com/api/users')
    .then((res) => {
        console.log(`Status: ${res.status}`);
        response.json(res.data)
      }).catch((err) => {
        console.log(err.response.data.detail)
        response.status(400).send(err.response.data.detail)
    })
}

exports.getUserById = (req, response) => { 
  console.log("Getting user with id: " + req.params.id)

  axios.get('https://ubademy-user-service.herokuapp.com/api/users/' + req.params.id)
    .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log('Body: ', res.data);
        response.json(res.data)
      }).catch((err) => {
        console.log(err.response.data.detail)
        response.status(400).send(err.response.data.detail)
    })
}

exports.updateUserById = (req, response) => { 
  console.log("Updating user with id: " + req.params.id)

  axios.put('https://ubademy-user-service.herokuapp.com/api/users/' + req.params.id, req.body)
    .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log('Body: ', res.data);
        response.json(res.data)
      }).catch((err) => {
        console.log(err.response.data.detail)
        response.status(400).send(err.response.data.detail)
    })
}

exports.getCourseCategories = (req, response) => { 
  console.log("Getting course categories")

  axios.get('https://ubademy-user-service.herokuapp.com/api/categories')
    .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log('Body: ', res.data);
        response.json(res.data)
      }).catch((err) => {
        console.log(err.response.data.detail)
        response.status(400).send(err.response.data.detail)
    })
}

exports.getUserCourseCategories = (req, response) => { 
  console.log("Getting course categories for user with id: " + req.params.userId)

  axios.get('https://ubademy-user-service.herokuapp.com/api/categories/' + req.params.userId)
    .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log('Body: ', res.data);
        response.json(res.data)
      }).catch((err) => {
        console.log(err.response.data.detail)
        response.status(400).send(err.response.data.detail)
    })
}

exports.createCategorie = (req, response) => { 
  console.log("Creating categories")

  axios.post('https://ubademy-user-service.herokuapp.com/api/categories', req.body)
    .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log('Body: ', res.data);
        response.status(201).json(res.data)
      }).catch((err) => {
        console.log(err.response.data.detail)
        response.status(400).send(err.response.data.detail)
    })
}

exports.addCategoryToUser = (req, response) => { 
  console.log("Adding category to user")

  axios.post('https://ubademy-user-service.herokuapp.com/api/categories/user', req.body)
    .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log('Body: ', res.data);
        response.status(201).json(res.data)
      }).catch((err) => {
        console.log(err.response.data.detail)
        response.status(400).send(err.response.data.detail)
    })
}

exports.createUser = (req, response) => { 
  console.log("Creating user")

  axios.post('https://ubademy-user-service.herokuapp.com/api/users', req.body)
    .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log('Body: ', res.data);
        response.status(201).json(res.data)
      }).catch((err) => {
        console.log(err.response.data.detail)
        response.status(400).send(err.response.data.detail)
    })
}
