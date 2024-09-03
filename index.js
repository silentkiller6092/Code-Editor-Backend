import express from "express";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());

app.listen(4000, () => {
  console.log("App is running on port 4000");
});
