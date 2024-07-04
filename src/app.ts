import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { ApolloServer } from "apollo-server-koa";
import { buildSchema } from "type-graphql";
import path from "path";
import connectToMongoDB from "./mongodb/conectionDatabase";
import makeTransactions from "./utils/scripts/scriptTransaction";
import { resolvers } from "./resolvers";

export const createApp = async () => {
  const app = new Koa();
  const router = new Router();

  // Middleware setup
  app.use(cors());
  app.use(bodyParser());

  // Build GraphQL schema
  const graphqlSchema = await buildSchema({
    resolvers,
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    validate: false,
  });

  // Initialize Apollo Server
  const server = new ApolloServer({
    schema: graphqlSchema,
    context: ({ ctx }) => ({
      req: ctx.request,
      res: ctx.response,
      user: ctx.state.user, 
  })
});
  await server.start();
  server.applyMiddleware({ app });

  // Route to start transactions
  router.get("/start-transactions", async (ctx) => {
    try {
      for (let i = 0; i < 100; i++) { // Adjust loop count as needed
        const result = await makeTransactions(); // Call transaction function
        console.log(`Request ${i + 1}:`, result); // Log result of each request
      }
      ctx.body = "All transactions initiated!"; // Respond to the request
    } catch (error) {
      console.error("Error starting transactions:", error);
      ctx.status = 500;
      ctx.body = "Failed to start transactions"; // Handle error response
    }
  });

  app.use(router.routes()).use(router.allowedMethods());

  // Connect to MongoDB
  connectToMongoDB(); // Assuming this function handles MongoDB connection

  return app; // Return configured Koa application
};

export default createApp;
