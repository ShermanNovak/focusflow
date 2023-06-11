import express from 'express';
import mongoose from 'mongoose';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'FocusFlow API',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./docs/*.swagger.yml'],
};

const swaggerSpec = swaggerJSDoc(options);

import goalRoutes from './routes/goalRoutes';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('MongoDB connection URI is not defined in the environment variables.');
}

const app = express();
app.use(express.json());

app.use('/api/goals', goalRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

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