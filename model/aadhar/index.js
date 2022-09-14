import mongoose from 'mongoose'

const aadharSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
  }
},

{
  timestamps: true
}
)

export const Aadhar = mongoose.model('aadhar', aadharSchema)
