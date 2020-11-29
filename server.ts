import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import rateLimit from "express-rate-limit";
import expenseController from "./server/expense/expense-controller";
import { initDbClient } from "./server/utils/database";
import { TOO_MANY_REQUESTS } from "./server/utils/errors";

async function createServer() {
  config();
  const app = express();

  await initDbClient();
  app.use(cors());
  app.use(bodyParser.json());

  app.use(
    rateLimit({
      max: Number(process.env.RATE_LIMIT_MAX || 60),
      handler: (req, res) => {
        res.status(429).json(TOO_MANY_REQUESTS);
      },
    })
  );

  app.use("/api", expenseController());

  app.use((req: Request, res: Response) => {
    res.status(404).json({
      error: "not_found",
      error_description: `Cannot ${req.method} ${req.url}`,
    });
  });
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server started at port", process.env.PORT || 3000);
  });
}

createServer();
