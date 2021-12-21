/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const apiGatewayService = require("../app/services/api-gateway-service");

var firebase_header = {"firebase_authentication": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjcxMTQzNzFiMmU4NmY4MGM1YzYxNThmNDUzYzk0NTEyNmZlNzM5Y2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlyLWF1dGgtOGJiMjgiLCJhdWQiOiJmaXItYXV0aC04YmIyOCIsImF1dGhfdGltZSI6MTY0MDEyNzQzMSwidXNlcl9pZCI6IkJSSGxrcWpHYm5YTVZ6dE5EMFMyUVhLckoyYjIiLCJzdWIiOiJCUkhsa3FqR2JuWE1WenRORDBTMlFYS3JKMmIyIiwiaWF0IjoxNjQwMTI3NDMxLCJleHAiOjE2NDAxMzEwMzEsImVtYWlsIjoiZGFtaWFuMTFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImRhbWlhbjExQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.guUKcMf_XAtJNtn6821JqVo1fcXjpICg6YIRxDcmB-bes6GfgPqNawAnRPux9kVQyn-yyqBHKEifwCDuEy8QAHTq0UxFKqT4UtS5M9HJcmL02A1aBl9nOqixc_ohf0tnV6aWSxo5agaX8qToUORd19mjnkUmRQwEbBoTyerse2a22rOnApUxjeIx7qLNoiWX77ccBLhpFQHCacQy2ca7-VUZQ4Q_oOnjT1FxuvTkQ02dCS3YgBD-txIwhxs4IEP3yHP9x-p0zTcXwnV0wmwVUSAkEHeV77II4drlsXum3f3EMO8EPt7AKiLhjyDYLhh0PbKW3w8pFDTiBO8Swbo_fg"};
var firebase_header_fake = {"firebase_authentication": "test"};

var fake_header = {"fake_auth": "test"};

var facebook_header_fake = {"facebook_authentication": "test"};


test("Manage Firebase token should get email", () => {
    apiGatewayService.manageAuthToken(firebase_header, function(email){
        expect(email).not.toBeNull();
    });
});

test("Manage fake token should get null email", () => {
    apiGatewayService.manageAuthToken(fake_header, function(email){
        expect(email).toBeNull();
    });
});

test("Manage Firebase fake token should get null email", () => {
    apiGatewayService.manageAuthToken(firebase_header_fake, function(email){
        expect(email).toBeNull();
    });
});

test("Manage Facebook fake token should get null email", () => {
    apiGatewayService.manageAuthToken(facebook_header_fake, function(email){
        expect(email).toBeNull();
    });
});
