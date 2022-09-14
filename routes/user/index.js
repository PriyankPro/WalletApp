import express from 'express'
import { getUserById, IsAdmin, isAuthenticated, isSignedIn, getAllUser, UpdateUser, DeleteUser, AddFriend, viewFriendList } from '../../controllers/index.js'

const router = express.Router()

router.param('userId', getUserById)
// Get User
router.get('/:userId', isSignedIn, isAuthenticated, (req, res) => {
  res.status(200).json({
    id: req.profile._id,
    name: req.profile.name,
    role: req.profile.role,
    email: req.profile.email,
    friendList: req.profile.friendList,
    kyc: req.profile.kyc

  })
})

// Get all Users by admin
router.get('/admin/:userId', isSignedIn, isAuthenticated, IsAdmin, getAllUser)

// Update User
router.put('/:userId', isSignedIn, isAuthenticated, UpdateUser)
// Delete User
router.delete('/:userId', isSignedIn, isAuthenticated, DeleteUser)
// Add friend to our friend List
router.put('/addFriend/:userId', isSignedIn, isAuthenticated, AddFriend)
// Remove a friend from our friend List

// View friend list
router.get('/viewlist/:userId', isSignedIn, isAuthenticated, viewFriendList)
export default router
