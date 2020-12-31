import TechStack from '../models/techStack.model'
import { handleError, handleResponse } from '../helpers/response.helper'

const getAllTechStacksService = async () => {
    try {
        const techStacks = await TechStack.find()
        return handleResponse('Get tech stacks successfully', techStacks)
    } catch (error) {
        console.log(error)
    }
}

const getOneTechStackService = async (id) => {
    try {
        const techStack = await TechStack.findOne({ _id: id })

        if (!techStack) return handleError('Tech stack does not exist', 404) 

        return handleResponse('Get tech stack successfully', techStack)
    } catch (error) {
        console.log(error)
    }
}

const createTechStackService = async (data) => {
    try {
        const techStackExist = await TechStack.findOne({ name: { $regex: data.name, $options: 'i' } })

        if (techStackExist) return handleError('Tech stack already exist', 400)

        const techStack = new TechStack(data)
        const newTechStack = await techStack.save()
        return handleResponse('Create tech stack successfully', newTechStack)
    } catch (error) {
        console.log(error)
    }
}

const updateTechStackService = async (id, data) => {
    try {
        const techStack = await TechStack.findOne({ _id: id })

        if (!techStack) return handleError('Tech stack does not exist', 404)

        if (data.name) {
            const techStackExist = await TechStack.findOne({ name: { $regex: data.name, $options: 'i' } })

            if (techStackExist && techStack.name !== data.name) return handleError('Tech stack already exist', 400)
        }

        const updateTechStack = await TechStack.updateOne(
            { _id: id },
            {
                $set: data
            }
        )

        return handleResponse('Update tech stack successfully', updateTechStack)
    } catch (error) {
        console.log(error)
    }
}

const deleteTechStackService = async (id) => {
    try {
        const techStack = await TechStack.findOne({ _id: id })

        if (!techStack) return handleError('Tech stack does not exist', 404)

        const deleteTechStack = await TechStack.deleteOne({ _id: id })
        return handleResponse('Delete tech stack successfully', deleteTechStack)
    } catch (error) {
        console.log(error)
    }
}

export { getAllTechStacksService, getOneTechStackService, createTechStackService, updateTechStackService, deleteTechStackService }