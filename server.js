const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");

    // Server Start
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server Running on Port ${PORT}`);
    });
})
.catch((err) => {
    console.log("MongoDB Connection Error:");
    console.log(err);
});

// Test Route
app.get("/", (req, res) => {
    res.send("Social Media Backend Working");
});

// Routes
app.use(
    "/api/posts",
    require("./routes/posts")
);

app.use(
    "/api/auth",
    require("./routes/auth")
);

app.use(
    "/api/users",
    require("./routes/users")
);
