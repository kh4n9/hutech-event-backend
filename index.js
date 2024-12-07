const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes");

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.listen(port, () => {
  console.log(`HutechEventBE listening on port ${port}`);
});

try {
  mongoose.connect(process.env.MONGO_URL, {});
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}
