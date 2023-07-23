import express from 'express';
import mongoose from 'mongoose';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import { swaggerRouter } from './routes/swaggerRoutes';
import cors from 'cors';

import goalRoutes from './routes/goalRoutes';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import journalEntryRoutes from './routes/journalEntryRoutes';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('MongoDB connection URI is not defined in the environment variables.');
}

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/goals', goalRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes)
app.use('/swagger', swaggerRouter);
app.use('/api/journal', journalEntryRoutes);

var schema = buildSchema(`
  type Query {
    hello: String
  }
`)

var root = {
  hello: () => {
    return "Hello world!"
  }
}

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))


mongoose.connect(MONGODB_URI)
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`SUCCESSFULLY CONNECTED TO MONGODB! listening on http://localhost:${process.env.PORT}`);
  });
})
.catch((error: Error) => {
    console.log(error)
})
