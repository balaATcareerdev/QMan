import "dotenv/config";
import app from "./server.js";

const PORT = process.env.PORT || 3000;

console.log("Starting server...");

const server = app.listen(PORT, () => {
  console.log(`✓ Server is running on port ${PORT}`);
});

server.on("error", (error) => {
  console.error("Server error:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});
