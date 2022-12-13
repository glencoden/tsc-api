"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const InitType_1 = require("./enums/InitType");
const initOptions = {
    [InitType_1.InitType.PERSIST]: {},
    [InitType_1.InitType.UPDATE]: { alter: true },
    [InitType_1.InitType.RESET]: { force: true }
};
function waitFor(time = 1000) {
    return new Promise(resolve => setTimeout(resolve, time));
}
class SequelizeOrm {
    constructor({ databaseUrl }) {
        this.sequelize = new sequelize_1.Sequelize(databaseUrl);
    }
    _onSync() { }
    async sync(initType) {
        const options = initOptions[initType];
        let connectionSuccess = false;
        while (!connectionSuccess) {
            await waitFor(2000);
            await this.sequelize.authenticate()
                .then(() => {
                connectionSuccess = true;
            })
                .catch((err) => {
                console.log(err);
            });
        }
        await this.sequelize.sync(options);
        this._onSync();
    }
}
exports.default = SequelizeOrm;
//# sourceMappingURL=SequelizeOrm.js.map