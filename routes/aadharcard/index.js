import express from 'express'
import { Aadhar } from '../../model/index.js'
const router = express.Router()

// create aadhar card with default balance
router.post('/', async (req, res) => {
  const card = new Aadhar(req.body)
  try {
    const savecard = await card.save()
    res.status(200).json(savecard)
  } catch (e) {
    console.log(e)
    res.status(400).json({ e: 'Error' })
  }
})
// view aadhar card information with default balance

export default router
