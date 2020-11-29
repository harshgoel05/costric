import { ObjectID } from "mongodb";
import { getDbClient } from "../utils/database";
export async function getExpenses() {
  const dbClient = await getDbClient();
  return await dbClient.db().collection("expense").find({}).toArray();
}

export async function addExpense(expense: any) {
  const dbClient = await getDbClient();
  await dbClient.db().collection("expense").insertOne(expense);
}
export async function deleteExpense(id: any) {
  const dbClient = await getDbClient();
  await dbClient
    .db()
    .collection("expense")
    .deleteOne({ _id: new ObjectID(id) });
}
export async function updateExpense(expense: any, id: any) {
  const dbClient = await getDbClient();
  await dbClient
    .db()
    .collection("expense")
    .updateOne({ _id: new ObjectID(id) }, expense);
}
