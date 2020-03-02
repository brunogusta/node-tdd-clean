import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'

require('dotenv').config()

const { MONGO_URL, PORT } = process.env

MongoHelper.connect(MONGO_URL)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(PORT, () => console.log(`Sever running at http://localhost:${PORT}`))
  })
  .catch(console.error)
