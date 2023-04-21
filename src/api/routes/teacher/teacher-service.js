import db from "../../../../db/index.js";

export const getTeachers = async () => {
    return db.teachers.findAll({
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
    });
};

export const getUnassignedTeachers = async () => {
    return db.teachers.findAll({
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        include: {
            model: db.classes
        }
    }).then((teachers) => {
        const unassignedTeachers = [];
        teachers.forEach((teacher) => {
            if (teacher.class === null) {
                let tempTeacher = teacher.get({plain: true});
                delete tempTeacher['class'];
                unassignedTeachers.push(tempTeacher);
            }
        });
        return unassignedTeachers;
    });
}

export const addTeacher = async (name, subject, email, contactNumber) => {
    const teacherWithSameEmail = await db.teachers.findOne({
        where: {
            email: email
        }
    });
    if (teacherWithSameEmail) {
        throw new Error(`Email is already associated with another teacher with id: ${teacherWithSameEmail.id} and name: ${teacherWithSameEmail.name}`);
    }
    const newTeacher = await db.teachers.create({
        name: name,
        subject: subject,
        email: email,
        contactNumber: contactNumber
    }).then((resp) => {
        return resp.get({plain: true});
    });
    delete newTeacher['id'];
    delete newTeacher['updatedAt'];
    delete newTeacher['createdAt'];
    return newTeacher;
};