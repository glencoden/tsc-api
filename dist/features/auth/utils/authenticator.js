"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
function sendResponse(res, message, error) {
    const success = error === undefined;
    res.status(!success ? 400 : 200).json({
        success,
        message,
        error,
    });
}
function getAllUsers(req, res) {
    index_1.authOrm.getAllUsers()
        .then(users => {
        res.json({
            success: true,
            users,
        });
    })
        .catch(err => {
        sendResponse(res, 'something went wrong', err);
    });
}
function registerUser(req, res) {
    if (!req.body.userName) {
        sendResponse(res, 'unkown userName', true);
        return;
    }
    index_1.authOrm.isValidUser(req.body.userName)
        .then(result => {
        const isValid = result.length === 0;
        if (!isValid) {
            sendResponse(res, 'user already exists');
            return;
        }
        return index_1.authOrm.register(req.body.userName, req.body.password);
    })
        .then(() => {
        sendResponse(res, `registered ${req.body.userName}`);
    })
        .catch(err => {
        sendResponse(res, 'something went wrong', err);
    });
}
function deleteUser(req, res) {
    if (!req.body.id) {
        sendResponse(res, 'unkown userName', true);
        return;
    }
    index_1.authOrm.deleteUser(req.body.id)
        .then(() => {
        sendResponse(res, `deleted user with id: ${req.body.id}`);
    })
        .catch(err => {
        sendResponse(res, 'something went wrong', err);
    });
}
function login(req, res) { }
exports.default = {
    getAllUsers,
    registerUser,
    deleteUser,
    login,
};
//# sourceMappingURL=authenticator.js.map