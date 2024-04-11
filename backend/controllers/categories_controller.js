const Sequelize = require("sequelize");
const Category = require("../models").Category;

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.json(category);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: "Category already exists" });
    } else {
      res.status(500).json({ error: "Error creating Category" });
    }
  }
};

exports.getCategories = async (req, res) => {
  try {
    const Categories = await Category.findAll();
    res.json(Categories);
  } catch (error) {
    res.status(500).json({ error: "Error getting Categories" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const categoryUpdated = await Category.update(req.body, {
      where: { id: id }
    });
    res.json(categoryUpdated);
  } catch (error) {
    res.status(500).json({ error: "Error editing category" });
  }
};


exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await category.destroy();
    res.json({ message: "Category successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting Category" });
  }
};
