const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const posts = require("./lib/posts.json");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Posts Service");
});

app.post("/payment", (req, res) => {
  try {
    const { memberNo } = req.body;
    const post = posts.find((p) => p.memberNo == memberNo);

    if (!post) {
      return res.status(401).json({
        error: "Invalid credentials.",
      });
    }

    return res.json({
      memberNo: post.memberNo,
      amount: post.amount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Posts Service started at http://localhost:${PORT}`);
});

module.exports = app;