"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const InitType_1 = require("./db/enums/InitType");
const auth_1 = require("./features/auth");
const api_1 = require("./features/api");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5555;
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', (0, auth_1.authRouter)(app));
app.use('/tsc', (0, api_1.apiRouter)(app));
app.use(express_1.default.static(path_1.default.resolve('static')));
Promise.all([
    auth_1.authOrm.sync(InitType_1.InitType.UPDATE),
    api_1.apiOrm.sync(InitType_1.InitType.UPDATE),
])
    .then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
})
    .catch(err => {
    console.error('cannot connect to database', err);
});
//# sourceMappingURL=index.js.map