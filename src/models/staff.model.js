import { Schema, model } from 'mongoose'
import Project from './project.model'

const SkillSchema = new Schema({
  techStack: {
    type: Schema.Types.ObjectId,
    ref: 'TechStack',
  },
  experience: {
    type: String,
    enum: ['fresher', 'junior', 'senior'],
  },
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

StaffSchema.pre('deleteOne', async function (next) {
  try {
    await Project.updateMany(
      { _id: { $in: this.projects } },
      { $pull: { staffs: this._id } }
    )
    return next()
  } catch (error) {
    return next(error)
  }
})

export default model('Staff', StaffSchema)
