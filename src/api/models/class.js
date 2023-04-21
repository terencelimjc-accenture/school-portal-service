export default (sequelize, Sequelize) => {
    const Class = sequelize.define('classes', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV1
        },
        level: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        underscored: true,
    });
    Class.associate = (models) => {
        Class.belongsTo(models.teachers, {
            foreignKey: 'formTeacherId',
            targetKey: 'id',
            as: 'formTeacher'
        });
    };
    return Class;
}