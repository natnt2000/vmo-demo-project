import mongoose from 'mongoose'
const { Schema, model } = mongoose

const UserSchema = new Schema(
    {
        email: String,
        password: String,
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

export default model('User', UserSchema)
