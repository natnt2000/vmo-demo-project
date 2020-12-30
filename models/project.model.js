import { Schema, model } from 'mongoose'
import Department from '../models/department.model'

const ProjectSchema = new Schema(
    {
        name: String,
        description: String,
        projectType: {
            type: Schema.Types.ObjectId,
            ref: 'ProjectType',
        },
        projectStatus: {
            type: Schema.Types.ObjectId,
            ref: 'ProjectStatus',
        },
        techStack: {
            type: Schema.Types.ObjectId,
            ref: 'TechStack',
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Staff',
            }
        ],
    },
    {
        timestamps: true,
    }
)

ProjectSchema.post('save', async function (project) {
    try {
        const { _id, department } = project
        await Department.updateOne({ _id: department }, { $push: { projects: _id } })
    } catch (error) {
        console.log(error)
    }
    
})

ProjectSchema.pre('deleteOne', async function (next) {
    try {
        await Department.updateOne({_id: this.department}, {$pull: {projects: this._id}})
        return next()
    } catch (error) {
        return next(error)
    }
})

export default model('Project', ProjectSchema)
