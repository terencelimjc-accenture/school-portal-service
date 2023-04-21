import { config } from 'dotenv';

config({
    path: `.env.${process.env.NODE_ENV}`.trim()
});
export const ENV = {
    APP_URL: process.env.APP_URL || 'http://localhost:3000',
    PORT: process.env.NODE_PORT || 8080,
    DB: {
        HOST: process.env.DB_HOST || '',
        USER: process.env.DB_USER || '',
        PASSWORD: process.env.DB_PASSWORD || '',
    }
};