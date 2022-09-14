import express from 'express'
import userRoute from './user'
import kycRoute from './kyc'
import ccardRoute from './creditcard'
import aadharRoute from './aadharcard'
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
router.use('/kyc', kycRoute)
router.use('/aadhar', aadharRoute)
// router.use('/admin', adminRoute)
// router.use('/merchant', merchantRoute)
// router.use('/health', healthRoute)
router.use('/auth', authRoute)
router.use('/ccard', ccardRoute)

export default router
