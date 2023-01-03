const sorturlroutes = require("./router/shorturlroutes");
const urluserroutes = require("./router/urluserroutes");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

require("./db/conn");
// dotenv.config({ path: "./config.env" });


app.use(express.json());

app.use("/api/url", sorturlroutes);
app.use("/api/user", urluserroutes);

const server=app.listen(8000, () => {
  console.log(`server is running at port no 8000`);
});

