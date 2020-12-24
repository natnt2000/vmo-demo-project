import mongoose from 'mongoose'
const {Schema, model} = mongoose

const DepartmentSchema = new Schema({
    name: String,
    description: String,
    techStacks: [{
        type: Schema.Types.ObjectId,
        ref: 'TechStack'
    }]
})