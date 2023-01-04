"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeOrm_1 = __importDefault(require("../../db/SequelizeOrm"));
const user_1 = __importDefault(require("./models/user"));
const accessToken_1 = __importDefault(require("./models/accessToken"));
const adminUser_1 = __importDefault(require("./utils/adminUser"));
const getShaPass_1 = require("./helpers/getShaPass");
class AuthOrm extends SequelizeOrm_1.default {
    constructor(props) {
        super(props);
        this.User = this.sequelize.define('User', user_1.default);
        this.AccessToken = this.sequelize.define('AccessToken', accessToken_1.default);
    }
    _onSync() {
        this.User.findAll()
            .then(result => {
            if (result.length > 0) {
                return;
            }
            return this.User.create(adminUser_1.default);
        })
            .then(result => console.log('created admin', result))
            .catch(err => console.log('error creating admin', err));
    }
    register(_a) {
        var { password } = _a, user = __rest(_a, ["password"]);
        console.log(Object.assign({ password: (0, getShaPass_1.getShaPass)(password) }, user));
        return this.User.create(Object.assign({ password: (0, getShaPass_1.getShaPass)(password) }, user));
    }
    ;
    deleteUser(id) {
        return this.User.destroy({
            where: { id },
        });
    }
    ;
    getUser(userName, password) {
        return this.User.findAll({
            where: {
                userName,
                password: (0, getShaPass_1.getShaPass)(password),
            },
        });
    }
    ;
    getAllUsers() {
        return this.User.findAll();
    }
    isValidUser(userName) {
        return this.User.findAll({
            where: { userName },
        });
    }
    ;
    saveAccessToken(accessToken, userId) {
        return this.AccessToken.create({
            accessToken,
            userId,
        });
    }
    ;
    getUserIDFromBearerToken(bearerToken) {
        return this.AccessToken.findAll({
            where: {
                accessToken: bearerToken,
            },
        });
    }
    ;
}
exports.default = AuthOrm;
//# sourceMappingURL=AuthOrm.js.map