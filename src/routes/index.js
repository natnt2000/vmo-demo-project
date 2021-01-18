import projectStatusRoute from './projectStatus.route'
import projectTypeRoute from './projectType.route'
import techStackRoute from './techStack.route'
import customerRoute from './customer.route'
import departmentRoute from './department.route'
import staffRoute from './staff.route'
import projectRoute from './project.route'
import userRoute from './user.route'
import authRoute from './auth.route'

export default (app) => {
  app.use('/', authRoute)

  app.use('/api', [
    projectStatusRoute,
    projectTypeRoute,
    techStackRoute,
    customerRoute,
    departmentRoute,
    staffRoute,
    projectRoute,
    userRoute
  ])
}
