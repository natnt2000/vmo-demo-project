import { Schema, model } from 'mongoose'
import Project from './project.model'

const DepartmentSchema = new Schema({
    name: String,
    description: String,
    techStacks: [{
        type: Schema.Types.ObjectId,
        ref: 'TechStack'
    }],
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }],
    staffs: [{
        type: Schema.Types.ObjectId,
        ref: 'Staff'
    }]
}, {
    timestamps: true
})

DepartmentSchema.pre('deleteOne', async function (next) {
    try {
        await Project.updateMany(
            { _id: this.projects },
            { $pull: { department: this._id } }
        )
        return next()
    } catch (error) {
        return next(error)
    }
})


export default model('Department', DepartmentSchema)