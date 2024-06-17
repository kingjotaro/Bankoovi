import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { ApolloServer } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';
import path from 'path';
import connectToMongoDB from './database/conectionDatabase';
import mongoose from 'mongoose';
import makeTransactions from './utils/scripts/scriptTransaction';
import { resolvers } from './resolvers';

const setupMongoDB = () => {
  mongoose.set('strictQuery', true);
  connectToMongoDB();
  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
  }).on('error', (error) => {
    console.error('Connection error:', error);
  });
};

export const createApp = async () => {
  const app = new Koa();
  const router = new Router();

  app.use(cors());
  app.use(bodyParser());

  const graphqlSchema = await buildSchema({
    resolvers,
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    validate: false,
  });

  const server = new ApolloServer({
    schema: graphqlSchema,
    context: ({ ctx }) => ({
      req: ctx.request,
      res: ctx.response,
    }),
  });

  await server.start();
  server.applyMiddleware({ app });

  router.get('/start-transactions', async (ctx) => {
    for (let i = 0; i < 5000; i++) {
      const result = await makeTransactions();
      console.log(`Request ${i + 1}:`, result);
    }
    ctx.body = 'All orders sent!!!';
  });

  app.use(router.routes()).use(router.allowedMethods());

  setupMongoDB();

  return app;
};

export default createApp;
