import mongoose from 'mongoose'
const { Schema, model } = mongoose

const SkillSchema = new Schema({
    techStack: {
        type: Schema.Types.ObjectId,
        ref: 'TechStack',
    },
    experience: String,
})

const StaffSchema = new Schema(
    {
        fullName: String,
        birthday: Date,
        identificationNumber: String,
        phoneNumber: String,
        address: String,
        languages: [String],
        certificates: [String],
        skills: [SkillSchema],
        projects: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Project',
            },
        ],
    },
    {
        timestamps: true,
    }
)

export default model('Staff', StaffSchema, 'staffs')
