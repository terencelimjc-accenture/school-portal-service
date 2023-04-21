import express from "express";
import { addClass, getClasses } from "./class-service.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const classes = await getClasses();
        res.status(200).send({"data": classes});
    } catch (err) {
        console.log(err);
        res.status(400).send({"error": "Failed to retrieve list of classes."});
    }
})

router.post('/', 
    body('teacherEmail')
        .notEmpty()
        .trim()
        .isEmail(),
    body('level')
        .notEmpty()
        .trim()
        .custom((value) => {
            const LEVELS = [
                'Primary 1',
                'Primary 2',
                'Primary 3',
                'Primary 4',
                'Primary 5',
                'Primary 6'
            ];
            if (!LEVELS.includes(value)) {
                throw new Error('Invalid value');
            }
            return true;
        }),
    body('name')
        .notEmpty()
        .trim()
        .matches(/^[\w\-\s]+$/),
    async (req, res) => {
    try {
        const validationRes = validationResult(req);
        if (!validationRes.isEmpty()) {
            throw validationRes;
        }
        const { level, name, teacherEmail } = req.body;
        let newClass = await addClass(level, name, teacherEmail);
        res.status(201).send({"data": newClass});
    } catch (err) {
        console.log(err);
        res.status(400).send({"error": "Failed to add new class."});
    }
});

export default router;