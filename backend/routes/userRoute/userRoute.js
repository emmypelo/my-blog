const express = require('express');
const { userRegister, userLogin, fetchUsersCtrl, deleteUserCtrl, findSingleUserCtrl, userProfileCtrl, updateProfileCtrl, updateUserPasswordCtrl, followUserCtrl, unFollowUserCtrl, blockUserCtrl, unBlockUserCtrl, adminBlockCtrl, adminUnBlockCtrl, generateVerificationToken, accountVerificionCtrl, generateResetToken, passwordResetCtrl, profilePhotoUploadCtrl } = require('../../controllers/users/UserCtrl');
const authMiddleware = require('../../middleware/auth/authMiddleware');
const {photoUpload, profilePhotoResize}  = require('../../middleware/uploads/photoUpload');
const userRoute = express.Router()


userRoute.post('/register', userRegister)
userRoute.post('/login', userLogin)
userRoute.get('/', fetchUsersCtrl)
userRoute.get('/:id', findSingleUserCtrl)
userRoute.get('/profile/:id', authMiddleware, userProfileCtrl)
userRoute.patch('/update', authMiddleware, updateProfileCtrl)
userRoute.patch('/password', authMiddleware, updateUserPasswordCtrl)
userRoute.patch('/follow', authMiddleware, followUserCtrl)
userRoute.patch('/unfollow', authMiddleware, unFollowUserCtrl)
userRoute.patch('/blockuser/:userToBlockId', authMiddleware, blockUserCtrl)
userRoute.patch('/unblockuser/:userToUnBlockId', authMiddleware, unBlockUserCtrl)
userRoute.patch('/block/:id', authMiddleware, adminBlockCtrl)
userRoute.patch('/unblock/:id', authMiddleware, adminUnBlockCtrl)
userRoute.delete('/:id', deleteUserCtrl)
userRoute.post('/verify', authMiddleware, generateVerificationToken)
userRoute.patch('/verifytoken', authMiddleware, accountVerificionCtrl)
userRoute.post('/reset-token',  generateResetToken)
userRoute.patch('/reset-password', passwordResetCtrl)
userRoute.patch('/profile-photo-upload', authMiddleware, photoUpload.single('image'), profilePhotoResize, profilePhotoUploadCtrl)



module.exports = userRoute;