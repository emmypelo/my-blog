const express = require("express");
const {
  createCategoryCtrl,
  fetchCategoriesCtrl,
  fetchCategoryCtrl,
  updateCategoryCtrl,
  deleteCateoryCtrl,
} = require("../../controllers/category/categoryCtrl");
const authMiddleware = require("../../middleware/auth/authMiddleware");


const categoryRoute = express.Router();

categoryRoute.post("/", authMiddleware, createCategoryCtrl);
categoryRoute.get("/", authMiddleware, fetchCategoriesCtrl);
categoryRoute.get("/:id", authMiddleware, fetchCategoryCtrl);
categoryRoute.patch("/:id", authMiddleware, updateCategoryCtrl);
categoryRoute.delete("/:id", authMiddleware, deleteCateoryCtrl);
module.exports = categoryRoute;
