"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
function getClient(clientID, clientSecret, cb) {
    const client = {
        clientID,
        clientSecret,
        grants: null,
        redirectUris: null,
    };
    cb(false, client);
}
function grantTypeAllowed(clientID, grantType, cb) {
    cb(false, true);
}
function getUser(username, password, cb) {
    index_1.authOrm.getUser(username, password)
        .then(result => {
        cb(false, result.length === 1 ? result[0].dataValues : null);
    });
}
function saveAccessToken(accessToken, clientID, expires, user, cb) {
    index_1.authOrm.saveAccessToken(accessToken, user.id)
        .then(() => cb())
        .catch(err => {
        cb(err);
    });
}
function getAccessToken(bearerToken, cb) {
    index_1.authOrm.getUserIDFromBearerToken(bearerToken)
        .then(result => {
        const userID = result.length === 1 ? result[0].dataValues.user_id : null;
        const accessToken = {
            user: {
                id: userID,
            },
            expires: null,
        };
        cb(userID === null, userID === null ? null : accessToken);
    });
}
exports.default = {
    getClient,
    saveAccessToken,
    getUser,
    grantTypeAllowed,
    getAccessToken,
};
//# sourceMappingURL=tokenService.js.map