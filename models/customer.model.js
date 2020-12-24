import mongoose from 'mongoose'
const {Schema, model} = mongoose

const CustomerSchema = new Schema({
    name: String, 
    description: String,
    priorityNumber: Number,
    status: String
}, {
    timestamps: true
})