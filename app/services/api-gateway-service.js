var admin = require("firebase-admin");
var serviceAccount = require("./service-account.json");
const axios = require("axios");
const {logError, logInfo} = require("../utils/log");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.manageAuthToken = (headers) => {
    if (headers["firebase_authentication"]){
        logInfo("Checking Firebase token");
        this.checkFirebaseToken(headers["firebase_authentication"]);
        return;
    }
    
    if (headers["facebook_authentication"]){
        logInfo("Checking Facebook token");
        this.checkFacebookToken(headers["facebook_authentication"]);
        return;
    }
};

exports.checkFirebaseToken = (token) => { 
    admin.auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
        console.log("Firebase decoded token: " + decodedToken.email);
    })
    .catch((error) => {
        throw new Error
        console.log(error);
    });
};

exports.checkFacebookToken = (token) => { 
    const url = "https://graph.facebook.com/me?fields=name,email&access_token=" + token;
    logInfo("Facebook url: " + url);

    axios.get(url)
      .then((res) => {
        logInfo("Result for Facebook request: " + res["data"]["email"]);
      }).catch((err) => {
        logError(err.response.data.detail);
      });
};
