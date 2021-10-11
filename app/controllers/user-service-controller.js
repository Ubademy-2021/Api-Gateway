const serialize = require('serialize-javascript');
const deserialize = str => eval(`(${str})`);
const https = require('https')

const buildResponse = data => ({
  status: 'OK',
  data,
});

const buildError = err => ({
  status: 'ERROR',
  error: err.toString(),
});

exports.getUsers = (requ, resp) => {
  console.log("request: getUsers")

  const options = {
    hostname: 'ubademy-user-service.herokuapp.com',
    path: '/api/users',
    method: 'GET'
  }

  let output = '';

  const req = https.request(options, res => {
    console.log(`${options.hostname} : ${res.statusCode}`);
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      output += chunk;
    });

    res.on('end', () => {
      let obj = JSON.parse(output);
      console.log("Users found: ", obj)
      
      resp.send(obj)
      resp.status(200)
    })
  })

  req.on('error', (err) => {
    resp.send('error: ' + err.message);
  })

  req.end()
}
