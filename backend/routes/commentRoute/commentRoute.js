const express = require("express");
const {
  createCommentCtrl,
  fetchAllCommentsCtrl,
  fetchCommentCtrl,
  updateCommentCtrl,
  deleteCommentCtrl,
} = require("../../controllers/comments/commentCtrl");
const authMiddleware = require("../../middleware/auth/authMiddleware");
authMiddleware
const commentRoutes = express.Router();

commentRoutes.post("/", authMiddleware, createCommentCtrl);
commentRoutes.get("/", fetchAllCommentsCtrl);
commentRoutes.get("/:id", authMiddleware, fetchCommentCtrl);
commentRoutes.patch("/:id", authMiddleware, updateCommentCtrl);
commentRoutes.delete("/:id", authMiddleware, deleteCommentCtrl);
module.exports = commentRoutes;
