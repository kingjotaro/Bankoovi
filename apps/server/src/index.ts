import "reflect-metadata";
import path from 'path';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import connectToMongoDB from './database/conectionDatabase';
import { userResolvers } from './resolvers/account'; 


async function app() {
  // Conecte-se ao MongoDB
  await connectToMongoDB();

  // Crie o schema GraphQL
  const schema = await buildSchema({
    resolvers: [userResolvers],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    validate: false,
  });

  // Inicialize o servidor Apollo
  const server = new ApolloServer({
    schema,
  });

  // Inicie o servidor na porta especificada ou na porta padrão (4000)
  const { url } = await server.listen();
  console.log(`Server running at ${url}`);
}

// Chame a função app para iniciar o servidor
app();
