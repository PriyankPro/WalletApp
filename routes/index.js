import express from 'express'
import userRoute from './user'
// import adminRoute from './admin'
// import merchantRoute from './merchant'
// import healthRoute from './health'
import authRoute from './auth'
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
  res.send('Welcome to home page')
})

router.use('/user', userRoute)
// router.use('/admin', adminRoute)
// router.use('/merchant', merchantRoute)
// router.use('/health', healthRoute)
router.use('/auth', authRoute)

export default router
