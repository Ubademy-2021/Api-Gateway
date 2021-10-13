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
        response.send(err.response.data.detail)
    })
}

exports.createUser = (req, response) => { 
  console.log("Creating user")

  axios.post('https://ubademy-user-service.herokuapp.com/api/users', req.body)
    .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log('Body: ', res.data.id);
        response.json(res.data.id)
      }).catch((err) => {
        console.log(err.response.data.detail)
        response.send(err.response.data.detail)
    })
}
