const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/emails");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Access-Control-Allow-Headers,Access-Control-Allow-Headers,Authorization,X-Request-With, token"
  );
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});
app.get("/subscribe", async (req, res) => {
  const emails = await db.fetchEmails();
  if (emails.success) res.status(200).json({ emails });
  else res.status(500).json({ message: "Failed Fetching Emails" });
});

app.post("/subscribe", async (req, res) => {
  const results = await db.enterEmail(req.body);
  if (results.success)
    res
      .status(200)
      .json({ message: "Successfully Subscribed", data: { id: results.id } });
  else res.status(500).json({ message: "Failed Subscribing" });
});

app.listen(8000, () => console.log("Server is Up"));
