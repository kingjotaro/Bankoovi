// src/app.ts
import connectToMongoDB from './database/conectionDatabase';
import 'reflect-metadata';
import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { ApolloServer } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Resolvers
import { ByObjectIdResolver } from './resolvers/user/query/ByObjectIdResolver';
import { ByUserTaxIdResolver } from './resolvers/user/query/ByUserTaxIdResolver';
import path from 'path';

dotenv.config();

mongoose.set('strictQuery', true);
connectToMongoDB();
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
}).on('error', (error) => {
  console.error('Connection error:', error);
});

export const createApp = async () => {
  const app = new Koa();
  const router = new Router();

  app.use(cors());
  app.use(bodyParser());

  const graphqlSchema = await buildSchema({
    resolvers: [ByObjectIdResolver, ByUserTaxIdResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    validate: false,
  });

  const server = new ApolloServer({
    schema: graphqlSchema,
    context: ({ ctx }) => ({ context: ctx.state.context }),
  });

  await server.start();
  server.applyMiddleware({ app });

  app.use(router.routes()).use(router.allowedMethods());

  return app;
};

const PORT = process.env.PORT || 4000;

createApp().then(app => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}).catch(error => {
  console.error('Error starting server:', error);
});
