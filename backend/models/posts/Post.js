const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "post title is required"],
      trim: true,
    },

    comments: {
      type: Array,
      createdBy:{
         type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
      
    },

    category: {
      type: String,
      required: [true, "post category is required"],
      default: "All",
    },

    isLiked: {
      type: Boolean,
      default: false,
    },

    isDisLiked: {
      type: Boolean,
      default: false,
    },
    numViews: {
      type: Number,
      default: 0,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Auhor is required"],
    },

    description: {
      type: String,
      required: [true, "description is required"],
    },

    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
