import { TApp } from '../../types/TApp';
import express from 'express';
// @ts-ignore
import oAuth2Server from 'node-oauth2-server';
import tokenService from './utils/tokenService';
import authenticator from './utils/authenticator';


export function authRouter(app: TApp) {
    app.oauth = oAuth2Server({
        model: tokenService,
        grants: [ 'password' ],
        debug: true
    });

    app.use(app.oauth.errorHandler());

    const router = express.Router();

    router.post('/get_all', authenticator.getAllUsers);
    router.post('/register', authenticator.registerUser);
    router.post('/delete', authenticator.deleteUser);
    router.post('/login', app.oauth.grant(), authenticator.login);

    return router;
}