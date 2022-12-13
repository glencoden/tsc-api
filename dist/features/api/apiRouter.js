"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("./index");
const pdfGenerator_1 = __importDefault(require("./utils/pdfGenerator"));
function apiRouter(app) {
    const router = express_1.default.Router();
    router.route('/events')
        .get(async (req, res) => {
        const events = await index_1.apiOrm.getEvents(parseInt(`${req.query.id}`));
        res.json(events);
    })
        .post(app.oauth.authorise(), async (req, res) => {
        const event = await index_1.apiOrm.addEvent(req.body);
        res.json({
            success: true,
            event
        });
    })
        .put(app.oauth.authorise(), async (req, res) => {
        await index_1.apiOrm.updateEvent(req.body);
        const result = await index_1.apiOrm.getEvents(req.body.id);
        const event = result[0];
        res.json({
            success: true,
            event
        });
    })
        .delete(app.oauth.authorise(), async (req, res) => {
        const id = req.query.id;
        if (!id) {
            res.json({
                success: false,
                message: 'pass an id in query string'
            });
        }
        await index_1.apiOrm.deleteEvent(parseInt(`${id}`));
        res.json({
            success: true,
            id
        });
    });
    router.route('/competitors')
        .get(async (req, res) => {
        const competitors = await index_1.apiOrm.getCompetitors(parseInt(`${req.query.id}`));
        res.json(competitors);
    })
        .post(app.oauth.authorise(), async (req, res) => {
        const competitor = await index_1.apiOrm.addCompetitor(req.body);
        res.json({
            success: true,
            competitor
        });
    })
        .put(app.oauth.authorise(), async (req, res) => {
        await index_1.apiOrm.updateCompetitor(req.body);
        const result = await index_1.apiOrm.getCompetitors(req.body.id);
        const competitor = result[0];
        res.json({
            success: true,
            competitor
        });
    })
        .delete(app.oauth.authorise(), async (req, res) => {
        const id = req.query.id;
        if (!id) {
            res.json({
                success: false,
                message: 'pass an id in query string'
            });
        }
        await index_1.apiOrm.deleteCompetitor(parseInt(`${id}`));
        res.json({
            success: true,
            id
        });
    });
    router.post('/print', app.oauth.authorise(), (req, res) => {
        const { competitors } = req.body;
        if (!Array.isArray(competitors) || competitors.length === 0) {
            pdfGenerator_1.default.createFallback(res);
            return;
        }
        if (req.query.layout === 'protocol') {
            pdfGenerator_1.default.createProtocol(res, competitors);
            return;
        }
        pdfGenerator_1.default.createCertificates(res, competitors);
    });
    router.get('/get_all', app.oauth.authorise(), async (_, res) => {
        const [events, competitors] = await index_1.apiOrm.getAll();
        res.json({
            success: true,
            events,
            competitors
        });
    });
    router.get('/recover_event', app.oauth.authorise(), async (req, res) => {
        const id = req.query.id;
        if (!id) {
            res.json({
                success: false,
                message: 'pass an id in query string'
            });
        }
        await index_1.apiOrm.recoverEvent(parseInt(`${id}`));
        res.json({
            success: true,
            id
        });
    });
    router.get('/recover_competitor', app.oauth.authorise(), async (req, res) => {
        const id = req.query.id;
        if (!id) {
            res.json({
                success: false,
                message: 'pass an id in query string'
            });
        }
        await index_1.apiOrm.recoverCompetitor(parseInt(`${id}`));
        res.json({
            success: true,
            id
        });
    });
    router.get('/clear_database', app.oauth.authorise(), async (_, res) => {
        await index_1.apiOrm.clearCache();
        res.json({
            success: true
        });
    });
    return router;
}
exports.apiRouter = apiRouter;
//# sourceMappingURL=apiRouter.js.map