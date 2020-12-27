import mongoose from 'mongoose'
const { Schema, model } = mongoose

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

export default model('Project', ProjectSchema, 'projects')
