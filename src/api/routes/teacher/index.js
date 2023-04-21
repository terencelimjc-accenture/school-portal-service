import express from "express";
import { addTeacher, getTeachers, getUnassignedTeachers } from "./teacher-service.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const teachers = await getTeachers();
        res.status(200).send({"data": teachers});
    } catch (err) {
        console.log(err);
        res.status(400).send({"error": "Failed to retrieve list of teachers."});
    }
});

router.get('/unassigned', async (req, res) => {
    try {
        const teachers = await getUnassignedTeachers();
        res.status(200).send({"data": teachers});
    } catch (err) {
        console.log(err);
        res.status(400).send({"error": "Failed to retrieve list of teachers."});
    }
});

router.post('/', 
    body('name')
    .notEmpty()
    .trim()
    .matches(/^[\w\-\s]+$/),
    body('subject')
    .notEmpty()
    .trim()
    .custom((value) => {
        const SUBJECTS = [
            'English Language',
            'Mother Tongue Language',
            'Mathematics',
            'Science',
            'Art',
            'Music',
            'Physical Education',
            'Social Studies',
            'Character and Citizenship Education'
        ];
        if (!SUBJECTS.includes(value)) {
            throw new Error('Invalid value');
        }
        return true;
    }),
    body('email')
    .notEmpty()
    .trim()
    .isEmail(),
    body('contactNumber')
    .notEmpty()
    .trim()
    .matches(/^[689]\d{7}$/),
    async (req, res) => {
    try {
        const validationRes = validationResult(req);
        if (!validationRes.isEmpty()) {
            throw validationRes;
        }
        const { name, subject, email, contactNumber } = req.body;
        let newTeacher = await addTeacher(name, subject, email, contactNumber);
        res.status(201).send({ "data": newTeacher });
    } catch (err) {
        console.log(err);
        res.status(400).send({"error": "Failed to add new teacher."});
    }
});

export default router;