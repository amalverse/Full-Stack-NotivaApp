import "dotenv/config";
import connectDB from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

// Database Connection and Server Start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port http://localhost:${PORT}`);
  });
});
