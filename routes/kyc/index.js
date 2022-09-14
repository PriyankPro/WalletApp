import express from 'express'
import {
  getUserById,
  IsAdmin,
  isAuthenticated,
  isSignedIn,
  getAllUser,
  UpdateUser,
  DeleteUser,
  AddFriend,
  viewFriendList,
  doKyc
} from '../../controllers/index.js'

const router = express.Router()
router.param('userId', getUserById)

router.put('/:aadharId', doKyc)

export default router
