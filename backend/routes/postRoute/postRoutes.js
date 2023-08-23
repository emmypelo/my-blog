const express = require("express");
const {
  createPostCtrl,
  fetchAllPostsCtrl,
  fetchPost,
  updatePost,
  deletePostCtrl,
  likePostCtrl,
  dislikePostCtrl,
} = require("../../controllers/posts/postctrl");
const authMiddleware = require("../../middleware/auth/authMiddleware");
const {
  photoUpload,
  postPhotoResize,
} = require("../../middleware/uploads/photoUpload");
const postRoute = express.Router();

postRoute.post(
  "/",
  authMiddleware,
  photoUpload.single("image"),
  postPhotoResize,
  createPostCtrl
);
postRoute.get("/", fetchAllPostsCtrl);
postRoute.get("/:id", authMiddleware, fetchPost);
postRoute.patch("/:id", authMiddleware, updatePost);
postRoute.delete("/:id", authMiddleware, deletePostCtrl);
postRoute.patch("/post/likes", authMiddleware, likePostCtrl);
postRoute.patch("/post/dislikes", authMiddleware, dislikePostCtrl);

module.exports = postRoute;
