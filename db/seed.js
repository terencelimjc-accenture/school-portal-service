import db from "./index.js";

try {
    await db.sequelize.authenticate();
    console.log('It works!');
} catch (error) {
    console.error('Unable to connect to database:', error);
}

try {
    await db.sequelize.sync({ force: true });
    console.log('Sync works!');
} catch (error) {
    console.error('Unable to sync:', error);
}

try {
    await db.teachers.bulkCreate([
        {
            name: 'John Lim',
            subject: 'Mathematics',
            email: 'johnlim@gmail.com',
            contactNumber: '99283283'
        },
        {
            name: 'John Tan',
            subject: 'English',
            email: 'johntan@gmail.com',
            contactNumber: '99283284'
        },
        {
            name: 'John Wang',
            subject: 'Chinese',
            email: 'johnwang@gmail.com',
            contactNumber: '99283293'
        }
    ]);

    const teacher = await db.teachers.findOne({ where: { name: 'John Lim' } });

    await db.classes.bulkCreate([
        {
            level: 'Primary 1',
            name: 'Class 1A',
            formTeacherId: teacher.id
        }
    ])
    console.log('Seeding works!');
} catch (err) {
    console.error('Unable to seed:', err);
}