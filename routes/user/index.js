import express from 'express'
const router = express.Router()

// Test route
router.get('/', (req, res) => {
  res.send('Hello World testing successfull')
})

export default router
