import express from 'express';
import mongoose from 'mongoose';

import goalRoutes from './routes/goalRoutes';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('MongoDB connection URI is not defined in the environment variables.');
}

const app = express();
app.use(express.json());

app.use('/api/goals', goalRoutes);

app.get("/", function (req, res) {
  res.send("Hello World");
});

mongoose.connect(MONGODB_URI)
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`SUCCESSFULLY CONNECTED TO MONGODB! listening on http://localhost:${process.env.PORT}`);
  });
})
.catch((error: Error) => {
    console.log(error)
})