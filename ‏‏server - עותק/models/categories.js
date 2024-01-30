module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define('categories',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: Sequelize.INTEGER
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    )
    return Categories;
}