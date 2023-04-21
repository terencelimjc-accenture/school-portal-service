import { Sequelize } from "sequelize";
import { Teacher, Class } from "../src/api/models/index.js";
import { ENV } from "../src/config.js";

const sequelize = new Sequelize('sp', ENV.DB.USER, ENV.DB.PASSWORD, {
    host: ENV.DB.HOST,
    dialect: 'mysql',
    timezone: '+08:00',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: (...msg) => console.log(msg)
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.teachers = Teacher(sequelize, Sequelize);
db.classes = Class(sequelize, Sequelize);
db.teachers.associate(db);
db.classes.associate(db);

export default db;