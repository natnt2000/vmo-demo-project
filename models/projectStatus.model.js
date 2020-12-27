import mongoose from 'mongoose'
const {Schema, model} = mongoose

const ProjectStatusSchema = new Schema({
    name: String,
    description: String,
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

export default model('ProjectStatus', ProjectStatusSchema, 'project_statuses')