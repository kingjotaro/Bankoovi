import "reflect-metadata";
import path from 'path';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import connectToMongoDB from './database/conectionDatabase';
import { AccountResolver } from './resolvers/accountResolver'; 
import { UserResolver } from "./resolvers/userResolver";
import Transaction from "./database/schemas/transactionModel";


async function app() {

  await connectToMongoDB();


  const schema = await buildSchema({
    resolvers: [AccountResolver, UserResolver, Transaction],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    validate: false,
  });


  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen();
  console.log(`Server running at ${url}`);

  
}

app();
