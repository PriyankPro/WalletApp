import { User } from '../../model/index.js'
import bcrypt from 'bcrypt'

export const getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
    if (user) {
      req.profile = user
      next()
    } else {
      res.status(400).json({ error: 'Error occurred while fetching data' })
    }
  } catch (e) {
    console.log('Error occurred while fetching data please try again later', e)
    res.status(400).json({ error: e })
  }
}

export const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find({}, { password: 0 })
    // const { _id, name, role, email, friendList } = allUser

    if (allUser) {
      res.status(200).json({ Users: allUser })
    }
  } catch (e) {
    console.log('Error occured while fetching data please try again later ', e)
    res.status(400).json({ error: e })
  }
}

export const UpdateUser = async (req, res) => {
  if (req.body.userId == req.params.userId) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
      } catch (err) {
        return res.status(403).json(err)
      }
    }
    try {
      await User.findByIdAndUpdate(req.params.userId, {
        $set: req.body
      })
      res.status(200).json('Account is Updated ')
    } catch (err) {
      return res.status(400).json(err)
    }
  } else {
    return res.status(403).json('You can only update your account!!!')
  }
}
// Adding friend to current user's friend list

export const AddFriend = async (req, res) => {
  if (req.body.userId !== req.params.userId) {
    try {
    //   await User.find({ friendList: { $in: req.body.userId } })
    //   return res.status(400).json('User already exists in your friend list')
    // } catch (e) {
    //   res.status(400).json({ e: 'User already exists in your friend list' })
    // }
      const user = await User.findById(req.body.userId)

      const currentUser = await User.findById(req.params.userId)
      if (currentUser.friendList.includes(req.body.userId)) {
        return res.status(403).json('You have already added this user to your friend list')
      } else {
        await User.findByIdAndUpdate(req.params.userId, {
          $push: { friendList: req.body.userId }
        })
        res.status(200).json('Friend added successfully')
      }
    } catch (e) {
      res.status(400).json({ e: 'Failed to add user ' })
    }
    //
    // try {
    //   await User.findByIdAndUpdate(req.params.userId, {
    //     $push: { friendList: req.body.userId }
    //   })
    //   res.status(200).json('Friend added successfully')
    // } catch (err) {
    //   return res.status(400).json(err)
    // }
  } else {
    res.status(302).json('You cannot add yourself please add your friend to the list.')
  }
}
// Deleting current user's account
export const DeleteUser = async (req, res) => {
  if (req.body.userId == req.params.userId) {
    try {
      const user = await User.deleteOne({ id: req.params.userId })
      console.log(user)
      res.status(200).json('Account is deleted successfully thank you for using our services!! ')
    } catch (err) {
      res.status(400).json({ Error: err })
    }
  }
}

// View FriendList of Current User

export const viewFriendList = async (req, res) => {
  const list = await User.findById(req.params.userId)
  console.log(list.friendList)
  res.status(200).json(list.friendList)
}
