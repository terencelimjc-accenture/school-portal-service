export default (sequelize, Sequelize) => {
    const Teacher = sequelize.define('teachers', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV1
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        subject: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        contactNumber: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true,
    });
    Teacher.associate = (models) => {
        Teacher.hasOne(models.classes, {
            foreignKey: "formTeacherId",
            sourceKey: "id",
        });
    };
    return Teacher;
}