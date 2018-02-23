import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import * as paths from './utils/paths';
import * as db from './Dbi';
import Dbi from './Dbi';
import * as session from 'express-session';
import * as fileUpload from 'express-fileupload';
let indexRouter = require('./routes/index');


// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;
    private dbi: Dbi;

    //Run configuration methods on the Express instance
    constructor() {
        this.express = express();
        this.dbi = db.dbi;
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(this.allowCrossDomain);
        this.express.use(express.static(paths.publicFile));
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(session({
            secret: 'codingdefined',
            resave: false,
            saveUninitialized: true,
            cookie: {
                httpOnly: false,
                secure: false,
            },
        }));
        this.express.use(fileUpload());
    }

    private allowCrossDomain = function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type,api-key');

        next();
    };

    // Configure API endpoints.
    private routes(): void {
        //Add API end points here
        let router = express.Router();
        // placeholder route handler

        router.use('/', indexRouter);
        this.express.use('/', router);
    }

}

export default new App().express;
