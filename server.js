const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const resultRoutes = require("./routes/resultRoutes");

 
const connectdb=require("./config/db")
connectdb();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const questionRoutes = require("./routes/questionRoutes");
app.use("/api", questionRoutes);


app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/test", require("./routes/testRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/results", resultRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
console.log(
  "GROQ KEY:",
  process.env.GROQ_API_KEY ? "Loaded" : "Missing"
);