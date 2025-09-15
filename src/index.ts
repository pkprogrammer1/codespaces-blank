import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';


const prisma = new PrismaClient();


const server = new ApolloServer({
typeDefs,
resolvers,
context: () => ({ prisma })
});


const port = process.env.PORT ?? 4000;


async function start() {
await server.start();
server.listen({ port }).then(({ url }) => {
// eslint-disable-next-line no-console
console.log(`🚀 Server ready at ${url}`);
});
}


start().catch((e) => {
console.error(e);
process.exit(1);
});