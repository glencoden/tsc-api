import { TApp } from './types/TApp';
import express from 'express';
import path from 'path';
import { InitType } from './db/enums/InitType';
import { authOrm, authRouter } from './features/auth';
import { apiOrm, apiRouter } from './features/api';

const app: TApp = express();

const PORT = process.env.PORT || 5555;

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRouter(app));
app.use('/tsc', apiRouter(app));

app.use(express.static(path.resolve('static')));

Promise.all([
    apiOrm.sync(InitType.UPDATE),
    authOrm.sync(InitType.UPDATE),
])
    .then(() => {
        app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
    })
    .catch(err => {
        console.error('cannot connect to database', err);
    });
