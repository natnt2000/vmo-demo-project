import { Schema, model } from 'mongoose'
import Department from '../models/department.model'
import Staff from '../models/staff.model'

const ProjectSchema = new Schema(
    {
        name: String,
        description: String,
        projectType: {
            type: Schema.Types.ObjectId,
            ref: 'ProjectType'
        },
        projectStatus: {
            type: Schema.Types.ObjectId,
            ref: 'ProjectStatus'
        },
        techStack: {
            type: Schema.Types.ObjectId,
            ref: 'TechStack'
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: 'Department'
        },
        staffs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Staff'
            }
        ],
        startDate: Date,
        endDate: Date
    },
    {
        timestamps: true
    }
)

ProjectSchema.methods.checkDates = (startDate, endDate) => {
    return Date.parse(startDate) < Date.parse(endDate)
}

ProjectSchema.post('save', async function (project) {
    try {
        const { _id, department } = project
        await Department.updateOne({ _id: department }, { $push: { projects: _id } })
        await Staff.updateMany({ _id: { $in: project.staffs } }, { $push: { projects: project._id } })
    } catch (error) {
        console.log(error)
    }
})

ProjectSchema.pre('deleteOne', async function (next) {
    try {
        await Department.updateOne({ _id: this.department }, { $pull: { projects: this._id } })
        await Staff.updateMany({ _id: { $in: this.staffs } }, { $pull: { projects: this._id } })
        return next()
    } catch (error) {
        return next(error)
    }
})

export default model('Project', ProjectSchema)
