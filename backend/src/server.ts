import express from "express";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import serviceRouter from "./routes/serviceRoutes.js";
import slotRouter from "./routes/slotRoute.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("Received request at /");
  res.send("Hello, World!");
});

app.use("/auth", authRouter);
app.use("/service", serviceRouter);
app.use("/slot", slotRouter);

export default app;
