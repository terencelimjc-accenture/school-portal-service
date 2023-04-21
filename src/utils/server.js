import express from 'express';
import cors from 'cors';
import assignRoutes from '../api/routes/index.js';
import audit from 'express-requests-logger';
import { ENV } from '../config.js';

const createServer = () => {
    const app = express();
    
    const corsOptions = {
        origin: ENV.APP_URL
    };
    
    app.use(cors(corsOptions));
    app.use(express.json());
    // Setup request & response logger
    app.use(audit({
        logger: (...msg) => console.log(msg),
        request: {
        },
        response: {
        },
        doubleAudit: true
    }));
    assignRoutes(app);

    return app;
}

export default createServer;