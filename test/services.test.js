/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const apiGatewayService = require("../app/services/api-gateway-service");

var firebase_header = {"firebase_authentication": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1NmMwNDEwZmE1MjFjMTZlNDQ2NWE4ZjVjODU5NjZhNWY1MDk5NGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlyLWF1dGgtOGJiMjgiLCJhdWQiOiJmaXItYXV0aC04YmIyOCIsImF1dGhfdGltZSI6MTY0MDA2MjQyMCwidXNlcl9pZCI6InZtRkRIMUN5VjVNcEdRcHJiMHUyZTNOd3ZJQjMiLCJzdWIiOiJ2bUZESDFDeVY1TXBHUXByYjB1MmUzTnd2SUIzIiwiaWF0IjoxNjQwMDYyNDIwLCJleHAiOjE2NDAwNjYwMjAsImVtYWlsIjoibWFydGlubG9wZXpAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm1hcnRpbmxvcGV6QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.o4pGGNz4E3EW7v1zFuIfl02bovHYOrS5OJJqzssM9Io64hnRmq1zvcky1m0dsblH-02GPBoqxulYlGXImcYq3lOMXJT5rVsPPM1ph6TY5Lb_ufpkT6vvNWVMPfciMN6tqf9OFjdS7oR5n9CNhRtxoyNyIxoTd4i8uUam8Cx2bo051cmghVQsrahhDovp1J0oB6C_EZJYrpgQ4hpkv_5CUP07X8dL0o8nh9wRL_ApG2P8eDOpMFmt0yVCE0ZA9cl3UcdvZzUKmFUTYya-WsgvWtagaxAQxo25ME-4OIv3gMgZTw1sq4AXuFxsBr3WZBv_a8S8osYhj3fAtZExVr4fGg"};
var firebase_header_fake = {"firebase_authentication": "test"};

var fake_header = {"fake_auth": "EAAFogA6GZC4cBAG87SOBKPtz25CWq6YQkyulUjiO8ZB6LEBp3LAaUvRqZCdzZAZCB9J1SdPdayfhOvCsKxuxZC127wyqbwGlx3PzKgGZAwOfoV6Apm3eg38lsHroZCasCDIMvQcscJXhoIdPooIspoRpOcaOSYp3DusQ9DMt1i63WaOE4w7pN0oOUreY37GSJcsXdFrMHx2CMU9JHC7c3cpLvLU4kiU8MicNeWd4b3HOVKKktH0K7OAM"};

var facebook_header = {"facebook_authentication": ""};
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
