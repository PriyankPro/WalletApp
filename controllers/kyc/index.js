import { User, Aadhar } from '../../model/index.js'

export const doKyc = async (req, res) => {
  const id = req.params.aadharId

  const aadhar = await Aadhar.findOne({ _id: id })

  try {
    if (req.body.userId === aadhar.userId) {
      await User.findByIdAndUpdate(req.body.userId, { $set: { kyc: true } })
      res.status(200).json('Kyc performed successfully')
    } else {
      res.status(400).json('Invalid credentials')
    }
  } catch (e) {
    res.status(500).json(e)
  }
}

export const checkKyc = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.userId })
  try {
    if (user.kyc) {
      next()
    } else {
      res.status(400).json('KYC not done')
    }
  } catch (err) {
    res.status(500).json(500)
  }
}
