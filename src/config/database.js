import { connect } from 'mongoose'

export default () => {
  connect(
    process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
    () => console.log('Connected to DB')
  )
}
