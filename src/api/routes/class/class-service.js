import db from "../../../../db/index.js";

export const getClasses = async () => {
    return db.classes.findAll({
        attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'formTeacherId'] },
        include: [{model: db.teachers, as: 'formTeacher', attributes: ['name']}]
    });
};

export const addClass = async (level, name, teacherEmail) => {
    const formTeacher = await db.teachers.findOne({
        where: {
            email: teacherEmail
        },
        include: [{model: db.classes}]
    });
    if (!formTeacher) {
        throw new Error(`Teacher with email: ${formTeacher.email} cannot be found.`);
    } else if (formTeacher.class) {
        throw new Error(`Teacher with email: ${formTeacher.email} has already been assigned class: ${formTeacher.class.name}.`);
    }
    const newClass = await db.classes.create({
        level: level,
        name: name,
        formTeacherId: formTeacher.id
    }).then((resp) => {
        return resp.get({plain: true});
    });
    delete newClass['id'];
    delete newClass['formTeacherId'];
    delete newClass['updatedAt'];
    delete newClass['createdAt'];
    newClass.teacherEmail = formTeacher.email;
    return newClass;
};