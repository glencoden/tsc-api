"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const node_oauth2_server_1 = __importDefault(require("node-oauth2-server"));
const tokenService_1 = __importDefault(require("./utils/tokenService"));
const authenticator_1 = __importDefault(require("./utils/authenticator"));
function authRouter(app) {
    app.oauth = (0, node_oauth2_server_1.default)({
        model: tokenService_1.default,
        grants: ['password'],
        debug: true
    });
    app.use(app.oauth.errorHandler());
    const router = express_1.default.Router();
    router.post('/get_all', authenticator_1.default.getAllUsers);
    router.post('/register', authenticator_1.default.registerUser);
    router.post('/delete', authenticator_1.default.deleteUser);
    router.post('/login', app.oauth.grant(), authenticator_1.default.login);
    return router;
}
exports.authRouter = authRouter;
//# sourceMappingURL=authRouter.js.map