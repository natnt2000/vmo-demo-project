import mongoose from 'mongoose'
const { Schema, model } = mongoose

const TechStackSchema = new Schema(
  {
    name: String,
    description: String,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export default model('TechStack', TechStackSchema, 'tech_stacks')
