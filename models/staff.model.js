import { Schema, model } from 'mongoose'

const SkillSchema = new Schema({
    techStack: {
        type: Schema.Types.ObjectId,
        ref: 'TechStack'
    },
    experience: {
        type: String,
        enum: ['fresher', 'junior', 'senior']
    }
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
                ref: 'Project'
            }
        ]
    },
    {
        timestamps: true
    }
)

export default model('Staff', StaffSchema)
