require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Initialize App
const { initSocket } = require("./socket");

// Initialize App
const app = express();
const server = http.createServer(app);
const io = initSocket(server);

// Middleware
app.use(cors());

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/groups", require("./routes/groupRoutes"));
app.use("/api/groups/:groupId/expenses", require("./routes/expenseRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/groups/:groupId/settlements", require("./routes/settlementRoutes"));
app.use("/api/settlements", require("./routes/settlementRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/groups/:groupId/activity", require("./routes/activityRoutes"));

app.set("io", io);

app.get("/", (req, res) => {
    res.json({ message: "SplitBuddy API is running... Chaos is loading." });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something broke! It's chaos!" });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
