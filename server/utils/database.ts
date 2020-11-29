import { MongoClient } from "mongodb";

let dbClient: MongoClient;

export async function initDbClient() {
  dbClient = await MongoClient.connect(process.env.DB_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ignoreUndefined: true,
  });
  console.log("Connected to database");
  return dbClient;
}

export async function getDbClient() {
  if (!dbClient) {
    await initDbClient();
  }

  return dbClient;
}
