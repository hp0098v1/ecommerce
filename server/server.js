const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/dbConn");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const fileRoutes = require("./routes/fileRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
// const categoryRoutes = require("./routes/categoryRoutes");
// const adminRoutes = require("./routes/adminRoutes");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

connectDB();
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/files", fileRoutes);
// app.use("/categories", categoryRoutes);
// app.use("/admin", adminRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
