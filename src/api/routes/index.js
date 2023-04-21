import classRouter from './class/index.js';
import teacherRouter from './teacher/index.js';

export default (app) => {
    app.use("/api/classes", classRouter);
    app.use("/api/teachers", teacherRouter);
};