const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      {
        message: "unsupported file type",
      },
      false
    );
  }
};

const photoUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

//  profile photo resize

const profilePhotoResize = async (req, res, next) => {
  if (!req.file) return next();
  req.file.fileName = `user-${Date.now()}-${req.file.originalname}`;
  await sharp(req.file.buffer)
    .resize(250, 250)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(`public/images/profile/${req.file.fileName}`));
  next();
};

const postPhotoResize = async (req, res, next) => {
  if (!req.file) return next();
  req.file.fileName = `user-${Date.now()}-${req.file.originalname}`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(`public/images/posts/${req.file.fileName}`));
  next();
};
module.exports = { photoUpload, profilePhotoResize, postPhotoResize };
