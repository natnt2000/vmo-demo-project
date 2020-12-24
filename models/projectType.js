import mongoose from 'mongoose'
const {Schema, model} = mongoose

const ProjectTypeSchema = new Schema({
    name: String,
    description: String,
    priorityNumber: Number,
    status: String
}, {
    timestamps: true
})

export default model('ProjectType', ProjectTypeSchema, 'project_types')