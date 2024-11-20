import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middlewares.mjs";

import { 
  loginUser,
  refreshAccessToken,
  registerUser,
  logoutUser ,
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getWatchHistory
} from "../controllers/userController.mjs";

import {upload} from "../middlewares/multer.middlewares.mjs";


const router = Router();

// unsecured route (means any one can access this route without login)
router.route('/register').post(
  // multiple inputs we use " upload.fields "
  upload.fields(
    [
      {
        name: 'avatar',
        maxCount: 1
      },
      {
       name: "coverImage",
       maxCount: 1
      }
    ]
  ),
  registerUser
)

router.route('/login').post(loginUser)
router.route('/refresh-token').post(refreshAccessToken)

// secured route 
router.route('/logout').post(verifyJWT,logoutUser)
router.route('/current-password').post(verifyJWT,changeCurrentPassword)
router.route('/current-user').get(verifyJWT,getCurrentUser)
router.route('/c/:username').get(verifyJWT,getUserChannelProfile)
router.route('/update-account').patch(verifyJWT,updateAccountDetails)
router.route('/update-avatar').patch(verifyJWT,upload.single('avatar'),updateUserAvatar)
router.route('/update-cover').patch(verifyJWT,upload.single('coverImage'),updateUserCoverImage)
router.route('/watch-history').get(verifyJWT,getWatchHistory)

export default router