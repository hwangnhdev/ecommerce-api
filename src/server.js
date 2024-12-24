import express from 'express'
import { CONNECT_DB, DISCONNECT_DB } from './config/mongodb.js'
import exitHook from 'async-exit-hook'
import { env } from './config/environment.js'
import { APIs_v1 } from './routes/v1/index.js'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware.js'

// Function to start server
const START_SERVER = () => {
  const app = express()

  // Enable JSON body parser
  app.use(express.json())

  // Use APIs v1 routes
  app.use('/v1', APIs_v1)

  // Use error handling middleware
  app.use(errorHandlingMiddleware)

  // Use route to test server
  app.get('/', (req, res) => {
    console.log(env.AUTHOR_NAME)
    res.send('Hello World!')
  })

  // Start server
  app.listen(env.PORT, env.HOSTNAME, () => {
    console.log(`Hi, I am ${ env.AUTHOR_NAME } and I am running at http://${ env.HOSTNAME }:${ env.PORT }/`)
  })

  // Exit hook to disconnect from MongoDB and exit process
  exitHook(() => {
    console.log('Server is shutting down...')
    DISCONNECT_DB()
    console.log('Disconnected from MongoDB')
    process.exit(0)
  })
}

// Connect to MongoDB and start server
CONNECT_DB()
  .then(() => { console.log('\nDatabase connected successfully') })
  .then(() => { START_SERVER() })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
