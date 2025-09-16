import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { createContext, Context } from './context';
import { config } from './config';

async function startServer() {
  // Create Express app
  const app = express();
  const httpServer = http.createServer(app);

  // Initialize Prisma Client
  const prisma = new PrismaClient();

  // Create Apollo Server
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // Start the server
  await server.start();

  // Apply the Apollo GraphQL middleware
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => createContext(prisma),
    })
  );

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Start HTTP server
  await new Promise<void>((resolve) => {
    httpServer.listen({ port: config.port }, resolve);
  });

  console.log(`🚀 Server ready at http://localhost:${config.port}/graphql`);
  console.log(`📊 Health check at http://localhost:${config.port}/health`);

  // Graceful shutdown
  process.on('SIGINT', async () => {
    console.log('🛑 Shutting down server...');
    await prisma.$disconnect();
    process.exit(0);
  });
}

startServer().catch((error) => {
  console.error('❌ Error starting server:', error);
  process.exit(1);
});