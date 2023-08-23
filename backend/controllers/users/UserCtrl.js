const expressAsyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const generateToken = require("../../config/token/generateToken");
const User = require("../../models/users/User");
const validateMongoId = require("../../utils/validateMongoID");
const crypto = require("crypto");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const fs = require("fs");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const userRegister = expressAsyncHandler(async (req, res) => {
  // check if user is already registered
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    throw new Error("Already registered");
  }

  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

const userLogin = expressAsyncHandler(async (req, res) => {
  //  check if user already exists
  const user = await User.findOne({ email: req.body.email });

  // check password

  if (user && (await user.comparePassword(req.body.password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user.id,
      profilePhoto: user.profilePhoto,
      token: generateToken(user._id),
      role:user.role
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});





// fetxh all the users

const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

// delete a user
const deleteUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //  ID valid?
  validateMongoId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.json(error);
  }
});

const findSingleUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //  ID valid?
  validateMongoId(id);
  try {
    const foundUser = await User.findById(id);
    res.json(foundUser);
  } catch (error) {
    res.json(error);
  }
});

// User profile page
const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //  ID valid?
  validateMongoId(id);
  try {
    const myProfile = await User.findById(id).populate('posts');
    res.json(myProfile);
  } catch (error) {
    res.json(error);
  }
});

const updateProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  //  ID valid?
  validateMongoId(_id);
  const updates = req.body;

  const userUpdated = await User.findByIdAndUpdate(
    _id,
    { $set: updates },
    { new: true, runValidators: true }
  );
  res.json(userUpdated);
});

// Updating yhe user password

const updateUserPasswordCtrl = expressAsyncHandler(async (req, res) => {
  //destructure the login user
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoId(_id);
  //Find tnhe user by _id
  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.json(user);
  }
});

// following and unfollowing users
const followUserCtrl = expressAsyncHandler(async (req, res) => {
  const { followId } = req.body;
  const loginUserId = req.user.id;

  const userToFollow = await User.findById(followId);

  if (userToFollow.followers.includes(loginUserId)) {
    throw new Error(`User "${loginUserId}" already follows "${followId}"`);
  } else {
    // update the user followwers arrY
    await User.findByIdAndUpdate(followId, {
      $push: { followers: loginUserId },
    });
    // udpate login user lollowing array
    await User.findByIdAndUpdate(loginUserId, {
      $push: { following: followId },
    });

    res.json("user followed successfully");
  }
});

const unFollowUserCtrl = expressAsyncHandler(async (req, res) => {
  const { unFollowId } = req.body;
  const loginUserId = req.user.id;

  const userToUnFollow = await User.findById(unFollowId);

  if (userToUnFollow.followers.includes(loginUserId)) {
    // update the user followwers arrY
    await User.findByIdAndUpdate(unFollowId, {
      $pull: { followers: loginUserId },
    });
    // udpate login user lollowing array
    await User.findByIdAndUpdate(loginUserId, {
      $pull: { following: unFollowId },
    });

    res.json("user unfollowed successfully");
  } else {
    throw new Error(`User "${loginUserId}" does not follow "${unFollowId}"`);
  }
});

// block a user by a user
const blockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { userToBlockId } = req.params;
  const loginUserId = req.user.id;
  const blocker = await User.findById(userToBlockId);
  validateMongoId(userToBlockId);
  if (blocker.blockedList.includes(userToBlockId)) {
    throw new Error("User already blocked");
  } else {
    await User.findByIdAndUpdate(loginUserId, {
      $push: { blockedList: userToBlockId },
    });
    console.log("User blocked");
    res.json(userToBlockId);
  }
});

// const unblock a user by a certain user

const unBlockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { userToUnBlockId } = req.params;
  const loginUserId = req.user.id;
  const unBlocker = await User.findById(userToUnBlockId);
  validateMongoId(userToUnBlockId);
  if (!unBlocker.blockedList.includes(userToUnBlockId)) {
    throw new Error("User not blocked");
  } else {
    await User.findByIdAndUpdate(loginUserId, {
      $pull: { blockedList: userToUnBlockId },
    });
    res.json(userToUnBlockId);
    console.log("User unblocked successfully");
  }
});

// Admin block
const adminBlockCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  const user2block = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true }
  );
  res.json(user2block);
});

const adminUnBlockCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  const user2Unblock = await User.findByIdAndUpdate(
    id,
    { isBlocked: false },
    { new: true }
  );
  res.json(user2Unblock);
  console.log("user unblocked successfully");
});

// Account verification
const generateVerificationToken = expressAsyncHandler(async (req, res) => {
  const loginUser = req.user.id;
  const user = await User.findById(loginUser);
  // create token
  const verificationToken = await user.verifyAccountToken();
  console.log(verificationToken);
  // save the user
  await user.save();

  try {
    // build message
    const verifyURL = `here is a link to verify your account within 10  minutes <a href="https://localhost:3000/verify-account/${verificationToken}">click here to verify</a>`;
    const msg = {
      to: "emmypeo@gmail.com",
      from: "emmypeloguns@gmail.com",
      subject: "Verify account",
      html: verifyURL,
    };

    await sgMail.send(msg);
    res.json(verifyURL);
  } catch (error) {
    res.json(error);
  }
});

// change account verifiction status
const accountVerificionCtrl = expressAsyncHandler(async (req, res) => {
  const { token } = req.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  console.log(hashedToken);
  // find user by hashed token
  const userFound = await User.findOne({
    verificationToken: hashedToken,
    verificationTokenExpires: { $gt: Date.now() },
  });
  if (!userFound) {
    throw new Error("Token expired");
  }
  userFound.iSVerified = true;
  userFound.verificationToken = "";
  userFound.verificationTokenExpires = "";
  await userFound.save();
  res.json(userFound);
});

// password reset

const generateResetToken = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("user not found");
  }
  // create token
  const passwordResetToken = await user.resetPasswordToken();
  console.log(passwordResetToken);
  // save the user
  await user.save();

  try {
    // build message
    const resetURL = `here is a link to reset your password, kindly reset it within 10  minutes <a href="https://localhost:3000/reset-password/${passwordResetToken}">click here to reset</a>`;
    const msg = {
      to: "emmypelo@gmail.com",
      from: "emmypeloguns@gmail.com",
      subject: "Verify account",
      html: resetURL,
    };

    await sgMail.send(msg);
    res.json(resetURL);
  } catch (error) {
    res.json(error);
  }
});

// Reset password
const passwordResetCtrl = expressAsyncHandler(async (req, res) => {
  const { token, password } = req.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  console.log(hashedToken);
  // find user by hashed token
  const userFound = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });
  if (!userFound) {
    throw new Error("Token expired");
  }
  userFound.password = password;
  userFound.passwordResetToken = undefined;
  userFound.passwordResetTokenExpires = undefined;

  await userFound.save();
  res.json(userFound);
});

// profile photo upload controller
const profilePhotoUploadCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;

  validateMongoId(_id);
  // img path
  const localPath = `public/images/profile/${req.file.fileName}`;
  const imgUploaded = await cloudinaryUploadImg(localPath, req.file);
  const userFound = await User.findByIdAndUpdate(
    _id,
    { profilePhoto: imgUploaded.url },
    { new: true }
  );
  res.json(userFound);
  fs.unlinkSync(localPath);
});

module.exports = {
  userRegister,
  userLogin,
  fetchUsersCtrl,
  deleteUserCtrl,
  findSingleUserCtrl,
  userProfileCtrl,
  updateProfileCtrl,
  updateUserPasswordCtrl,
  followUserCtrl,
  unFollowUserCtrl,
  blockUserCtrl,
  unBlockUserCtrl,
  adminBlockCtrl,
  adminUnBlockCtrl,
  generateVerificationToken,
  accountVerificionCtrl,
  generateResetToken,
  passwordResetCtrl,
  profilePhotoUploadCtrl,
};
