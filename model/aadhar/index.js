import mongoose from 'mongoose'

const aadharSchema = new mongoose.Schema({
  userId: {
    type: String
  }
},

{
  timestamps: true
}
)

export const Aadhar = mongoose.model('aadhar', aadharSchema)
