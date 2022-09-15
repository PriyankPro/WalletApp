import express from 'express'
import { Wallet } from '../../model/index.js'
import {
  getUserById,
  IsAdmin,
  isAuthenticated,
  isSignedIn,

  doKyc,
  checkKyc,
  createWallet

} from '../../controllers/index.js'

const router = express.Router()
router.param('userId', getUserById)
// Perform KYC
router.put('/:aadharId', doKyc)

// Create Wallet with default balance $0 and check kyc status if staus is true allow him to
// create wallet else notify the user to perform kyc first

// Create a wallet
router.get('/:userId', checkKyc, createWallet)

export default router
