import express from 'express'
import { Creditcard } from '../../model/index.js'
const router = express.Router()

// create credit card with default balance
router.post('/create', async (req, res) => {
  const card = new Creditcard(req.body)
  try {
    const savecard = await card.save()
    res.status(200).json(savecard)
  } catch (e) {
    console.log(e)
    res.status(400).json({ e: 'Error' })
  }
})
// view credit card information with default balance

export default router
