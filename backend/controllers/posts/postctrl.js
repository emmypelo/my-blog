const expressAsyncHandler = require("express-async-handler");
const Filter = require("bad-words");
const fs = require("fs");
const Post = require("../../models/posts/Post");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const validateMongoId = require("../../utils/validateMongoID");

const createPostCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.file);
  const { _id } = req.user;
  validateMongoId(_id);
  //Check for bad words
  const filter = new Filter();
  const isProfane = filter.isProfane(req.body.title, req.body.description);
  //Block user
  if (isProfane) {
    throw new Error(
      "Creating Failed because it contains profane words and you have been blocked"
    );
  }
  //1. Get the path to img
  const localPath = `public/images/posts/${req.file?.fileName}`;
  //2.Upload to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath);
  try {
    const posts = await Post.create({
      ...req.body,
      image: imgUploaded?.url,
      user: _id,
    });
    // res.json(imgUploaded);
    res.json(posts);
    fs.unlinkSync(localPath);
  } catch (error) {
    res.json(error);
  }
});
// fetch all posts
const fetchAllPostsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const posts = await await Post.find({}).populate("user");
    res.json(posts);
  } catch (error) {
    res.json(error);
  }
});

// fetch a single post
const fetchPost = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);

  try {
    const post = await Post.findById(id)
      .populate("user")
      .populate("likes")
      .populate("dislikes");
    // update number of views
    await Post.findByIdAndUpdate(
      post.id,
      { $inc: { numViews: 1 } },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// update post

const updatePost = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// delete a post

const deletePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const post = await Post.findByIdAndDelete;
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// likiong a post

const likePostCtrl = expressAsyncHandler(async (req, res) => {
  //   // find a post to like

  const { postId } = req.body;
  const post = await Post.findById(postId);
  //2. Find the login user
  const loginUserId = req?.user?._id;
  //3. Find is this user has liked this post?
  const isLiked = post?.isLiked;
  //4.Chech if this user has dislikes this post
  const alreadyDisliked = post?.disLikes?.includes(loginUserId);
  //5.remove the user from dislikes array if exists
  if (alreadyDisliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }
  //Toggle
  //Remove the user if he has liked the post
  if (isLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    //add to likes
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});

const dislikePostCtrl = expressAsyncHandler(async (req, res) => {
  //   // find a post to dislike

  const { postId } = req.body;
  const post = await Post.findById(postId);
  //2. Find the login user
  const loginUserId = req?.user?._id;
  //3. Find is this user has liked this post?
  const isDisLiked = post?.isDisLiked;
  //4.Chech if this user has dislikes this post
  const alreadyLiked = post?.likes?.includes(loginUserId);
  //5.remove the user from dislikes array if exists
  if (alreadyLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }
  //Toggle
  //Remove the user if he has disliked the post
  if (isDisLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    //add to likes
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { disLikes: loginUserId },
        isDisLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});

//1
//  }
module.exports = {
  createPostCtrl,
  fetchAllPostsCtrl,
  fetchPost,
  updatePost,
  deletePostCtrl,
  likePostCtrl,
  dislikePostCtrl,
};
