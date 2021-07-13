const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 8080;

app.use("/api/todo/",require('./routes/todo'))

app.listen(PORT, () => console.log(`Server started at ${PORT}`));

mongoose.connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify : true
    },
    (err) => {
      if (err) throw err;
      console.log("MongoDB connection established");
    }
);