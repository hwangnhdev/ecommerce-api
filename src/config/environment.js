import 'dotenv/config'

export const env = {
  AUTHOR_NAME: process.env.AUTHOR_NAME,
  AUTHOR_EMAIL: process.env.AUTHOR_EMAIL,
  AUTHOR_WEBSITE: process.env.AUTHOR_WEBSITE,
  AUTHOR_GITHUB: process.env.AUTHOR_GITHUB,
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_NAME: process.env.MONGODB_NAME,
  HOSTNAME: process.env.HOSTNAME,
  PORT: process.env.PORT,
}