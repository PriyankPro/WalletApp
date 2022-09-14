import mongoose from 'mongoose'

const ccardSchema = new mongoose.Schema(
  {
    userId: {
      type: String
    },
    balance: {
      type: Number,
      default: 250
    },
    cvv: {
      type: Number

    }

  },

  {
    timestamps: true
  }
)
export const Creditcard = mongoose.model('creditcard', ccardSchema)
