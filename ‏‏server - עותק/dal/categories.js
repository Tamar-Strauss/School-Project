const db = require('../models');
const Categories = db.Categories;

exports.create = async (category) => {
    return await Categories.create(category);
}
exports.findOne = async (condition) => {
    return await Categories.findOne(condition);
}
exports.findOneById = async (id) => {
    return await Categories.findOne({ where: { id: id } });
}
exports.findOneByName = async (name) => {
    return await Categories.findOne({ where: { name: name } });
}
exports.findAll = async (condition) => {
    return await Categories.findAll(condition);
}
exports.update = async (category, id) => {
    return await Categories.update(category, { where: { id: id } });
}
exports.delete = async (id) => {
    return await Categories.destroy({ where: { id: id } });
}