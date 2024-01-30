const dal = require('../dal/categories');

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can't be empty!" });
        return;
    }
    await dal.create(req.body)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some errors occured while creating the category." });
        })
}
exports.findByName = async (req, res) => {
    const name = req.body.name;
    await dal.findOneByName(name)
        .then(data => {
            if (data)
                res.send(data);
            else res.status(404).send({ message: `cannot find category by name: ${name}` });
        })
}
exports.findById = async (req, res) => {
    const id = req.params.id;
    await dal.findOneById(id)
        .then(data => {
            if (data)
                res.send(data);
            else res.status(404).send({ message: `Cannot find category by id ${id}` })
        })
}
exports.findAll = async (req, res) => {
    await dal.findAll()
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({ message: "Some error occurred while retrieving categories." });
        })
}
exports.update = async (req, res) => {
    const id = req.body.id;
    await dal.update(req.body, id)
        .then(num => {
            if (num == 1)
                res.send({ message: "Category was updated successfully." });
            else res.send({ message: `Cannot update category with id = ${id}. Maybe category was not found or req.body is empty!` });
        })
}
exports.delete = async (req, res) => {
    const id = req.params.id;
    await dal.delete(id)
        .then(num => {
            if (num == 1)
                res.send({ message: `Category was deleted successfully! 👍` })
            else
                res.send({ message: `Cannot delete category with id = ${id}. Maybe category was not found!` })
        })
        .catch(err => {
            res.status(500).send({ message: `Could not delete category with id ${id}` });
        });
}
