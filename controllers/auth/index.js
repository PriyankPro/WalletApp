// importing user model
import { User } from '../../model/index.js'

import { validationResult } from 'express-validator'

import jwt from 'jsonwebtoken'

import { expressjwt } from 'express-jwt'

import bcrypt from 'bcrypt'

export const signUp = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { email } = req.body
    let [user] = await Promise.all([User.findOne({ email })])
    // checking user
    if (user) {
      return res.status(400).json({
        error: 'User already exist or this email'
      })
    }
    // console.log(req.body)
    const hash = bcrypt.hashSync(req.body.password, 11)
    user = await new User({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash,
      role: req.body.role
    }).save()

    res.status(200).json({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      id: user._id
    })
  } catch (error) {
    return res.status(500).json({ err: 'Internal Server Error' })
  }
}

export const signIn = (req, res) => {
  const { email, password } = req.body

  const errors = validationResult(req)

  // console.log('Errors', errors)

  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({
      error: errors.array()[0].msg
    })
  }

  User.findOne({ email }, (err, user) => {
    // console.log(user)
    // console.log('Error ', err)
    if (err || !user) {
      console.log(err)
      return res
        .status(400)
        .json({ error: 'User with this email does not exist please create new account if you are new user' })
    }
    // console.log(password, user.password)
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        error: 'Email and password do not match'
      })
    }

    // Creating a token
    const token = jwt.sign({ _id: user._id, email: user.email }, 'BufferData')

    // Adding a token inside cookie

    res.cookie('token', token, { expire: new Date() + 9999 })

    // Sending a response to front end;

    const { _id, name, email } = user

    return res.json({
      token,
      user: {
        _id,
        name,
        email
      }
    })
  })
}

export const signOut = (req, res) => {
  res.clearCookie('token')

  res.json({
    message: 'User signout successfully'
  })
}

// protected routes
export const isSignedIn = expressjwt({
  secret: 'BufferData',
  algorithms: ['HS256'],
  userProperty: 'auth'
})

export const IsAdmin = (req, res, next) => {
  // console.log(req.profile);
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'You are not Admin'
    })
  }

  next()
}

export const isAuthenticated = (req, res, next) => {
  const checker = req.profile && req.auth && req.profile._id == req.auth._id
  if (!checker) {
    return res.status(403).json({
      error: 'Access denied'
    })
  }

  next()
}
