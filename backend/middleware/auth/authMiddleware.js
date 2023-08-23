const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../../models/users/User");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (token) {
        const decodeUser = jwt.verify(token, process.env.JWT_SECRET);
        // find the user by id
        const user = await User.findById(decodeUser?.id).select("-password");
        // attach the user to the request object
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("NOT AUTHORIZED, LOGIN AGAIN");
    }
  } else {
    throw new Error("No token found in the header");
  }
});

module.exports = authMiddleware;
