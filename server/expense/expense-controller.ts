import { Router, Request, Response } from "express";
import { SERVER_ERROR } from "../utils/errors";
import { validateRequest } from "../utils/validate-request";
import { expenseIdSchema, expenseListSchema } from "./expense-schema";
import {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} from "./expense-service";
async function handleGetExpenses(req: Request, res: Response) {
  try {
    const expense = await getExpenses();
    res.status(200).json(expense);
  } catch (err) {
    if (err.code && err.message) return res.status(err.code).json(err.message);
    return res.status(500).json(SERVER_ERROR);
  }
}
async function handleAddExpense(req: Request, res: Response) {
  try {
    let expense = req.body;
    expense = expenseListSchema.cast(expense);
    await addExpense(expense);
    res.status(200).json({ success: true });
  } catch (err) {
    if (err.code && err.message) return res.status(err.code).json(err.message);
    return res
      .status(500)
      .json({ message: SERVER_ERROR, message_details: err });
  }
}
async function handleDeleteExpense(req: Request, res: Response) {
  try {
    let id = req.params.id;
    await deleteExpense(id);
    res.status(200).json({ success: true });
  } catch (err) {
    if (err.code && err.message) return res.status(err.code).json(err.message);
    return res
      .status(500)
      .json({ message: SERVER_ERROR, message_details: err });
  }
}
async function handleUpdateExpense(req: Request, res: Response) {
  try {
    let expense = req.body;
    expense = expenseListSchema.cast(expense);
    let id = req.params.id;
    await deleteExpense(id);
    res.status(200).json({ success: true });
  } catch (err) {
    if (err.code && err.message) return res.status(err.code).json(err.message);
    return res
      .status(500)
      .json({ message: SERVER_ERROR, message_details: err });
  }
}

export default function expenseController() {
  const router = Router();
  router.get("/", handleGetExpenses);
  router.post(
    "/",
    validateRequest("body", expenseListSchema),
    handleAddExpense
  );
  router.delete(
    "/:id",
    validateRequest("params", expenseIdSchema),
    handleDeleteExpense
  );
  router.put(
    "/:id",
    validateRequest("params", expenseIdSchema),
    handleUpdateExpense
  );
  return router;
}
