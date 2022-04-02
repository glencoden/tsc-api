import express from 'express';
import { TApp } from '../../types/TApp';
import { apiOrm } from './index';
import pdfGenerator from './utils/pdfGenerator';


export function apiRouter(app: TApp) {
    const router = express.Router();

    // events

    router.route('/events')
        .get(async (req, res) => {
            const events = await apiOrm.getEvents(parseInt(`${req.query.id}`));
            res.json(events);
        })
        .post(app.oauth.authorise(), async (req, res) => {
            const event = await apiOrm.addEvent(req.body);
            res.json({
                success: true,
                event
            });
        })
        .put(app.oauth.authorise(), async (req, res) => {
            await apiOrm.updateEvent(req.body);
            const result = await apiOrm.getEvents(req.body.id);
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
            await apiOrm.deleteEvent(parseInt(`${id}`));
            res.json({
                success: true,
                id
            });
        });

    // competitors

    router.route('/competitors')
        .get(async (req, res) => {
            const competitors = await apiOrm.getCompetitors(parseInt(`${req.query.id}`));
            res.json(competitors);
        })
        .post(app.oauth.authorise(), async (req, res) => {
            const competitor = await apiOrm.addCompetitor(req.body);
            res.json({
                success: true,
                competitor
            });
        })
        .put(app.oauth.authorise(), async (req, res) => {
            await apiOrm.updateCompetitor(req.body);
            const result = await apiOrm.getCompetitors(req.body.id);
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
            await apiOrm.deleteCompetitor(parseInt(`${id}`));
            res.json({
                success: true,
                id
            });
        });

    // printer

    router.post('/print', app.oauth.authorise(), (req, res) => {
        const { competitors } = req.body;
        if (!Array.isArray(competitors) || competitors.length === 0) {
            pdfGenerator.createFallback(res);
            return;
        }
        if (req.query.layout === 'protocol') {
            pdfGenerator.createProtocol(res, competitors);
            return;
        }
        pdfGenerator.createCertificates(res, competitors);
    });

    // recover

    router.get('/get_all', app.oauth.authorise(), async (_, res) => {
        const [ events, competitors ] = await apiOrm.getAll();
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
        await apiOrm.recoverEvent(parseInt(`${id}`));
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
        await apiOrm.recoverCompetitor(parseInt(`${id}`));
        res.json({
            success: true,
            id
        });
    });

    // clear cache

    router.get('/clear_database', app.oauth.authorise(), async (_, res) => {
        await apiOrm.clearCache();
        res.json({
            success: true
        });
    });

    return router;
}