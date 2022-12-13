"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const SequelizeOrm_1 = __importDefault(require("../../db/SequelizeOrm"));
const event_1 = __importDefault(require("./models/event"));
const competitor_1 = __importDefault(require("./models/competitor"));
const cacheTime = 90;
class ApiOrm extends SequelizeOrm_1.default {
    constructor(props) {
        super(props);
        this.Event = this.sequelize.define('Event', event_1.default);
        this.Competitor = this.sequelize.define('Competitor', competitor_1.default);
    }
    getAll() {
        return Promise.all([
            this.Event.findAll(),
            this.Competitor.findAll()
        ]);
    }
    getEvents(id) {
        if (Number.isNaN(id)) {
            return this.Event.findAll({
                where: { deleted: null }
            });
        }
        return this.Event.findAll({
            where: {
                [sequelize_1.Op.and]: [
                    { id },
                    { deleted: null }
                ]
            }
        });
    }
    ;
    addEvent(request) {
        const { name, date, place, host, start, disciplines, gymnastics, competitorIds } = request;
        return this.Event.create({
            name,
            date,
            place,
            host,
            start,
            disciplines,
            gymnastics,
            competitorIds
        });
    }
    ;
    updateEvent(request) {
        return this.Event.update(request, {
            where: {
                id: request.id
            }
        });
    }
    ;
    deleteEvent(id) {
        return this.Event.update({
            deleted: new Date()
        }, {
            where: { id }
        });
    }
    ;
    recoverEvent(id) {
        return this.Event.update({
            deleted: null
        }, {
            where: { id }
        });
    }
    getCompetitors(id) {
        if (Number.isNaN(id)) {
            return this.Competitor.findAll({
                where: { deleted: null }
            });
        }
        return this.Competitor.findAll({
            where: {
                [sequelize_1.Op.and]: [
                    { id },
                    { deleted: null }
                ]
            }
        });
    }
    ;
    addCompetitor(request) {
        const { name, gender, year, weight, club, results } = request;
        return this.Competitor.create({
            name,
            gender,
            year,
            weight,
            club,
            results
        });
    }
    ;
    updateCompetitor(request) {
        return this.Competitor.update(request, {
            where: {
                id: request.id
            }
        });
    }
    ;
    deleteCompetitor(id) {
        return this.Competitor.update({
            deleted: new Date()
        }, {
            where: { id }
        });
    }
    ;
    recoverCompetitor(id) {
        return this.Competitor.update({
            deleted: null
        }, {
            where: { id }
        });
    }
    clearCache() {
        const staleDate = new Date();
        staleDate.setMinutes(staleDate.getMinutes() - 60 * 24 * cacheTime);
        const deletedEventIds = this.Event.findAll({
            where: { deleted: { [sequelize_1.Op.not]: null } }
        })
            .then(deletedEvents => deletedEvents.map((event) => {
            if (new Date(event.deleted) < staleDate) {
                return this.Event.destroy({
                    where: { id: event.id }
                });
            }
            return Promise.resolve();
        }))
            .catch(console.error);
        const deletedCompetitorIds = this.Competitor.findAll({
            where: { deleted: { [sequelize_1.Op.not]: null } }
        })
            .then(deletedCompetitors => deletedCompetitors.map((competitor) => {
            if (new Date(competitor.deleted) < staleDate) {
                return this.Event.destroy({
                    where: { id: competitor.id }
                });
            }
            return Promise.resolve();
        }))
            .catch(console.error);
        return Promise.all([
            deletedEventIds,
            deletedCompetitorIds
        ]);
    }
}
exports.default = ApiOrm;
//# sourceMappingURL=ApiOrm.js.map