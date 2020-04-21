const express = require("express");

const app = express();

const port = process.env.PORT || 5000;

app.use("/", express.static(__dirname));

app.listen(port, () => {
  console.log(`Snow miku app listening at http://localhost:${port}`);
});
