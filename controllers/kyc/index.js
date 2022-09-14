import { User, Aadhar } from '../../model/index.js'

export const doKyc = async (req, res) => {
  const id = req.params.aadharId
  console.log(id)
  const aadhar = await Aadhar.find(id)
  console.log('Aadhar ', aadhar.userId)
  try {
    if (req.body.userId == aadhar.userId) {
      // const id = req.body.userId
      await User.findByIdAndUpdate(req.body.userId, { $set: { kyc: true } })
      res.status(200).json('Kyc performed successfully')
    }
  } catch (e) {
    res.status(500).json(e)
  }
}
