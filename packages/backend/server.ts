import express from 'express';
const mongoose = require('mongoose')

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`SUCCESSFULLY CONNECTED TO MONGODB! listening at http://localhost:${process.env.PORT}`);
  });
})
.catch((error: Error) => {
    console.log(error)
})