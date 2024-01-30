module.exports = (sequelize, DataTypes) => {
    const Teachers = sequelize.define('teachers',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            name: {
                type: DataTypes.STRING(25)
            },

            idNumber: {
                type: DataTypes.STRING(9),
                unique: "compositeIndex",
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(25),
                unique: "compositeIndex",
                allowNull: false,
                validate: {
                    isEmail: true,
                    notNull: true
                }
            },
            password: {
                type: DataTypes.STRING(255),
                unique: "compositeIndex",
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );
    return Teachers;
}