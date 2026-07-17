const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet"); // Security middleware

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const {
  notFound,
  errorHandler,
} = require("./middleware/errorMiddleware");


// Load environment variables
dotenv.config();


// Connect MongoDB database
connectDB();


const app = express();


// =============================
// Middleware
// =============================

// Allow frontend to communicate with backend
app.use(cors());


// Adds security headers
app.use(helmet());


// Allows JSON data from requests
app.use(express.json());



// =============================
// Test Route
// =============================

app.get("/", (req, res) => {

  res.json({

    success: true,

    message: "Task Manager API Running 🚀"

  });

});



// =============================
// API Routes
// =============================

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);



// =============================
// Error Handling
// =============================

app.use(notFound);

app.use(errorHandler);



// =============================
// Server
// =============================

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

  console.log(`✅ Server running on port ${PORT}`);

});