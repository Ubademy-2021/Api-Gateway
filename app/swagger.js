const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Api-Gateway",
    description: "Api gateway for Ubademy app",
  },
  basePath: "/",
  host: "https://ubademy-api-gateway.herokuapp.com/api-gateway",
  schemes: ["http", "https"],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["app/index.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */
   
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require("./index");
});
