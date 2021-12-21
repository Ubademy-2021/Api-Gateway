/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const apiGatewayService = require("../app/services/api-gateway-service");

var header = {"facebook_authentication": "EAAFogA6GZC4cBAG87SOBKPtz25CWq6YQkyulUjiO8ZB6LEBp3LAaUvRqZCdzZAZCB9J1SdPdayfhOvCsKxuxZC127wyqbwGlx3PzKgGZAwOfoV6Apm3eg38lsHroZCasCDIMvQcscJXhoIdPooIspoRpOcaOSYp3DusQ9DMt1i63WaOE4w7pN0oOUreY37GSJcsXdFrMHx2CMU9JHC7c3cpLvLU4kiU8MicNeWd4b3HOVKKktH0K7OAM"};
var fake_header = {"fake_auth": "EAAFogA6GZC4cBAG87SOBKPtz25CWq6YQkyulUjiO8ZB6LEBp3LAaUvRqZCdzZAZCB9J1SdPdayfhOvCsKxuxZC127wyqbwGlx3PzKgGZAwOfoV6Apm3eg38lsHroZCasCDIMvQcscJXhoIdPooIspoRpOcaOSYp3DusQ9DMt1i63WaOE4w7pN0oOUreY37GSJcsXdFrMHx2CMU9JHC7c3cpLvLU4kiU8MicNeWd4b3HOVKKktH0K7OAM"};
var firebase_header = {"firebase_authentication": "test"};

test("Manage Facebook token should get email", () => {
    apiGatewayService.manageAuthToken(header, function(email){
        expect(email).not.toBeNull();
    });
});

test("Manage fake token should get null email", () => {
    apiGatewayService.manageAuthToken(fake_header, function(email){
        expect(email).toBeNull();
    });
});

test("Manage Firebase fake token should get null email", () => {
    apiGatewayService.manageAuthToken(firebase_header, function(email){
        expect(email).toBeNull();
    });
});