import { Schema, model } from 'mongoose'
import { compare, genSalt, hash } from 'bcrypt'

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

UserSchema.methods.verifyPassword = async function (targetPassword) {
    return await compare(targetPassword, this.password)
}

UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next()
        const salt = await genSalt(10)
        this.password = await hash(this.password, salt)
        return next()
    } catch (error) {
        return next(error)
    }
})

export default model('User', UserSchema)
