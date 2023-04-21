import db from '../db/index.js';
import { ENV } from './config.js';
import createServer from './utils/server.js';

const app = createServer();

db.sequelize.authenticate().then((response) => {
    console.log('Database is connected!');    
    app.listen(ENV.PORT, () => {
        console.log(`Server started at ${ENV.PORT}`);
    });
}).catch((error) => {
    console.error('Unable to connect to database:', error);
});