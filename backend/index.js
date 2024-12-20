require("dotenv").config();
const path = require("path");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/userRouter");
const cartRoutes = require("./routes/cartRoute");
const orderRoutes = require("./routes/orderRoute");



const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/jewelry";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use("/user", userRouter);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/orders", orderRoutes);



app.get("/", (req, res) => {
  res.send("Shopping Cart API is running...");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
