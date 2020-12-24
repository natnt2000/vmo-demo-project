import mongoose from 'mongoose'
const {Schema, model} = mongoose

const TechStackSchema = new Schema({
    name: String,
    description: String,
    status: String
}, {
    timestamps: true
})

export default model('TechStack', TechStackSchema)
