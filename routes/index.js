import projectStatusRoute from './projectStatus.route'
import projectTypeRoute from './projectType.route'
import techStackRoute from './techStack.route'
import customerRoute from './customer.route'
import departmentRoute from './department.route'
import staffRoute from './staff.route'
import projectRoute from './project.route'
import userRoute from './user.route'
import authRoute from './auth.route'

export default app => {
    app.use('/auth', authRoute)
    app.use('/api/projectStatuses', projectStatusRoute)
    app.use('/api/projectTypes', projectTypeRoute)
    app.use('/api/techStacks', techStackRoute)
    app.use('/api/customers', customerRoute)
    app.use('/api/departments', departmentRoute)
    app.use('/api/staffs', staffRoute)
    app.use('/api/projects', projectRoute)
    app.use('/api/users', userRoute)
}