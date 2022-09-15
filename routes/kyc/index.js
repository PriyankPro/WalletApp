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
  doKyc, checkKyc
} from '../../controllers/index.js'

const router = express.Router()
router.param('userId', getUserById)
// Perform KYC
router.put('/:aadharId', doKyc)

// Check KYC status
router.get('/:userId', checkKyc)

// Check KYC status

export default router
