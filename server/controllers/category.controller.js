import Category from '../models/category.model';
import errorHandler from './../helpers/dbErrorHandler';

const create = async (req, res) => {
  const category = new Category(req.body);
  try {
    await category.save();
    return res.status(200).json({
      message: 'Category created successfully!'
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const list = async (req, res) => {
  try {
    let categories = await Category.find().select('name created');
    res.json(categories);
  } catch (err) {
    return res.status('400').json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const categoryById = async (req, res, next, id) => {
  try {
    let category = await Category.findById(id);
    if (!category) {
      return res.status(400).json({
        error: 'Category not found'
      });
    }
    req.category = category;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve category"
    });
  }
};

const read = (req, res) => {
  return res.json(req.category);
};

const update = async (req, res, next) => {
  try {
    let category = req.category;
    category = Object.assign(category, req.body);

    category.updated = Date.now();
    await category.save();
    res.json(category);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const remove = async (req, res, next) => {
  try {
    let category = req.category;
    await category.remove();
    res.json({
      message: 'Category deleted successfully!'
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

export default {
  create,
  list,
  read,
  remove,
  categoryById,
  update
};
