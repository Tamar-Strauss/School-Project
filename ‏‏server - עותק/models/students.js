module.exports = (sequelize, Sequelize) => {
    const Students = sequelize.define('students', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING(15)
        },
        lastName: { 
            type: Sequelize.STRING(15)
        },
        idNumber: {
            type: Sequelize.STRING(9),
            unique: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(45),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true, 
                notNull: true
            }
            
        },
        password: {
            type: Sequelize.STRING(255),  
            unique: true,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING(255)
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
    );
    return Students;
}