import mongoose from 'mongoose'
const { Schema, model } = mongoose

const CustomerSchema = new Schema(
  {
    name: String,
    description: String,
    priorityNumber: Number,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export default model('Customer', CustomerSchema)
