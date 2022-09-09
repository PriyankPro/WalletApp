import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    lastname: {
      type: String,

      maxlength: 32,
      trim: true
    },

    role: {
      type: Number,
      default: 0
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    friendList: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
)

export const User = mongoose.model('User', userSchema)
