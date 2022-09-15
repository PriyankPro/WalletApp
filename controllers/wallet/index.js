import { Wallet } from '../../model/index.js'

export const createWallet = async (req, res) => {
  const wal = new Wallet({ userId: req.params.userId })

  try {
    const saveWal = await wal.save()
    res.status(200).json(saveWal)
  } catch (err) {
    res.status(500).json(err)
  }
}
