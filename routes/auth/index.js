import express from 'express'
import { body } from 'express-validator'
import { signUp, signOut, signIn } from '../../controllers/auth'
import { getUserById } from '../../controllers/index.js'

//
//

const router = express.Router()
router.param('userId', getUserById)
router.post(
  '/signup',
  [
    body('name')
      .isLength({ min: 3 })
      .withMessage('Name should be at least 3 characters'),
    body('email').isEmail().withMessage('Email is requried'),
    body('password')
      .exists()
      .withMessage('Password is required')
      .isLength({ min: 7 })
      .withMessage('Password should be at least 7 charcters long')
  ],
  signUp
)

router.post(
  '/signin',
  [
    body('email', 'Email is requried').isEmail(),
    body('password')
      .exists()
      .withMessage('Password is required')
      .isLength({ min: 7 })
      .withMessage('Password should be at least 7 charcters long')
  ],
  signIn,
  (req, res) => {
    console.log(res)
  }
)

router.get('/signout/:userId', signOut)

export default router
