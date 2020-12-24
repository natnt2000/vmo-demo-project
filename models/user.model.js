import mongoose from 'mongoose'
const { Schema, model } = mongoose

const UserSchema = new Schema({
    email: String,
    password: String,
    status: String
}, {
    timestamps: true
})

export default model('User', UserSchema, 'users')