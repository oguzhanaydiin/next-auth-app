import { MongoClient } from "mongodb"

export default async function connectToDatabase() {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.czfaeto.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
  const client = await MongoClient.connect(connectionString)
  return client
}
