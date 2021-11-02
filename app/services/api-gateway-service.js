var admin = require("firebase-admin");
var serviceAccount = require("./service-account.json");
const axios = require("axios");
const {logError, logInfo} = require("../utils/log");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.manageAuthToken = (headers, callback) => {
    if (headers["firebase_authentication"]){
        logInfo("Checking Firebase token");
        
        this.checkFirebaseToken(headers["firebase_authentication"], function(userEmail, err){
            if (err){
                logError("Error while checking Firebase token");
                callback(null, err);
            }

            // Successfull scenario
            callback(userEmail, null);
        });
        
        return;
    }
    
    if (headers["facebook_authentication"]){
        logInfo("Checking Facebook token");
        
        this.checkFacebookToken(headers["facebook_authentication"], function(userEmail, err){
            if (err){
                logError("Error while checking Facebook token");
                callback(null, err);
            }

            // Successfull scenario
            callback(userEmail, null);
        });

        return;
    }
};

exports.checkFirebaseToken = (token, callback) => { 
    admin.auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
        logInfo("Firebase decoded token mail: " + decodedToken.email);
        callback(decodedToken.email, null);
    })
    .catch((error) => {
        callback(null, error);
    });
};

exports.checkFacebookToken = (token, callback) => { 
    const url = "https://graph.facebook.com/me?fields=name,email&access_token=" + token;
    logInfo("Facebook url: " + url);

    axios.get(url)
      .then((res) => {
        logInfo("User email after Facebook request: " + res["data"]["email"]);
        callback(res["data"]["email"], null);
      }).catch((error) => {
        callback(null, error);
      });
};
