import mongoose from 'mongoose'

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true
    },
    balance: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

export const Wallet = mongoose.model('Wallet', walletSchema)
