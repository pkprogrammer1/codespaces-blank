# Apollo Server 4 + Prisma + TypeScript Boilerplate

A production-ready, scalable GraphQL API boilerplate built with Apollo Server 4, Prisma ORM, TypeScript, and PostgreSQL.

## 🚀 Features

- **Apollo Server 4** with Express integration
- **TypeScript** for type safety
- **Prisma ORM** with PostgreSQL database
- **Modular GraphQL** schema and resolvers
- **Docker & Docker Compose** for containerization
- **Environment configuration** management
- **Database migrations** and seeding
- **Health check endpoints**
- **Scalable folder structure**

## 📁 Project Structure

```
├── src/
│   ├── schema/           # GraphQL type definitions (modular)
│   │   ├── base.ts       # Base types (Query, Mutation)
│   │   ├── user.ts       # User-related types
│   │   ├── ride.ts       # Ride-related types
│   │   └── index.ts      # Schema merging
│   ├── resolvers/        # GraphQL resolvers (modular)
│   │   ├── user.ts       # User resolvers
│   │   ├── ride.ts       # Ride resolvers
│   │   └── index.ts      # Resolver merging
│   ├── config/           # Configuration management
│   │   └── index.ts      # Environment variables
│   ├── context.ts        # GraphQL context (Prisma client injection)
│   └── index.ts          # Server bootstrap
├── prisma/
│   ├── schema.prisma     # Database schema
│   ├── seed.ts          # Database seeding
│   └── migrations/      # Database migrations (auto-generated)
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Production setup
├── docker-compose.dev.yml # Development database
└── README.md
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- npm or yarn

### Quick Start with Docker

1. **Clone and navigate to the project:**
   ```bash
   git clone <repository-url>
   cd apollo-prisma-scalable
   ```

2. **Start the entire stack:**
   ```bash
   docker-compose up
   ```

This will:
- Start PostgreSQL database
- Run database migrations
- Seed the database with sample data
- Start the GraphQL API server

🎉 **Your API will be available at:**
- GraphQL Playground: http://localhost:4000/graphql
- Health Check: http://localhost:4000/health

### Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start PostgreSQL (development):**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run database migrations:**
   ```bash
   npm run migrate
   ```

5. **Generate Prisma client:**
   ```bash
   npm run generate
   ```

6. **Seed the database (optional):**
   ```bash
   npm run db:seed
   ```

7. **Start development server:**
   ```bash
   npm run dev
   ```

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the TypeScript project |
| `npm start` | Start production server |
| `npm run migrate` | Run database migrations |
| `npm run generate` | Generate Prisma client |
| `npm run studio` | Open Prisma Studio (database GUI) |
| `npm run db:seed` | Seed database with sample data |
| `npm run docker:up` | Start Docker containers |
| `npm run docker:down` | Stop Docker containers |
| `npm run type-check` | Run TypeScript type checking |

## 🗄️ Database Models

### User
```graphql
type User {
  id: ID!
  email: String!
  name: String
  rides: [Ride!]!
  createdAt: String!
  updatedAt: String!
}
```

### Ride
```graphql
type Ride {
  id: ID!
  from: String!
  to: String!
  price: Float!
  user: User!
  userId: ID!
  createdAt: String!
  updatedAt: String!
}
```

## 🔧 Example GraphQL Operations

### Queries

**Get all users:**
```graphql
query GetUsers {
  users {
    id
    email
    name
    rides {
      id
      from
      to
      price
    }
  }
}
```

**Get user by ID:**
```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    email
    name
    rides {
      id
      from
      to
      price
    }
  }
}
```

**Get all rides:**
```graphql
query GetRides {
  rides {
    id
    from
    to
    price
    user {
      id
      email
      name
    }
  }
}
```

### Mutations

**Create a user:**
```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    email
    name
    createdAt
  }
}

# Variables:
{
  "input": {
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Update a user:**
```graphql
mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    email
    name
    updatedAt
  }
}

# Variables:
{
  "id": "user-id-here",
  "input": {
    "name": "John Smith"
  }
}
```

**Create a ride:**
```graphql
mutation CreateRide($input: CreateRideInput!) {
  createRide(input: $input) {
    id
    from
    to
    price
    user {
      email
      name
    }
  }
}

# Variables:
{
  "input": {
    "from": "New York",
    "to": "Boston",
    "price": 50.0,
    "userId": "user-id-here"
  }
}
```

**Delete a user:**
```graphql
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id)
}

# Variables:
{
  "id": "user-id-here"
}
```

## 🌍 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `PORT` | Server port | `4000` |
| `NODE_ENV` | Environment mode | `development` |

## 🐳 Docker Commands

**Build and start all services:**
```bash
docker-compose up --build
```

**Start services in detached mode:**
```bash
docker-compose up -d
```

**View logs:**
```bash
docker-compose logs -f
```

**Stop all services:**
```bash
docker-compose down
```

**Remove volumes (reset database):**
```bash
docker-compose down -v
```

## 🔄 Database Migrations

**Create a new migration:**
```bash
npx prisma migrate dev --name migration-name
```

**Apply migrations in production:**
```bash
npx prisma migrate deploy
```

**Reset database:**
```bash
npx prisma migrate reset
```

## 🏗️ Extending the API

### Adding a New Module

1. **Create schema file** (`src/schema/newmodule.ts`):
   ```typescript
   export const newModuleTypeDefs = `
     type NewEntity {
       id: ID!
       name: String!
     }
     
     extend type Query {
       newEntities: [NewEntity!]!
     }
   `;
   ```

2. **Create resolver file** (`src/resolvers/newmodule.ts`):
   ```typescript
   export const newModuleResolvers = {
     Query: {
       newEntities: async (_: any, __: any, { prisma }: Context) => {
         return prisma.newEntity.findMany();
       },
     },
   };
   ```

3. **Update schema index** (`src/schema/index.ts`):
   ```typescript
   import { newModuleTypeDefs } from './newmodule';
   
   export const typeDefs = mergeTypeDefs([
     baseTypeDefs,
     userTypeDefs,
     rideTypeDefs,
     newModuleTypeDefs, // Add this
   ]);
   ```

4. **Update resolver index** (`src/resolvers/index.ts`):
   ```typescript
   import { newModuleResolvers } from './newmodule';
   
   export const resolvers = mergeResolvers([
     userResolvers,
     rideResolvers,
     newModuleResolvers, // Add this
   ]);
   ```

5. **Update Prisma schema** (`prisma/schema.prisma`):
   ```prisma
   model NewEntity {
     id   String @id @default(cuid())
     name String
   }
   ```

6. **Run migration:**
   ```bash
   npm run migrate
   ```

## 🚀 Production Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Set production environment variables**

3. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Useful Links

- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [GraphQL Documentation](https://graphql.org/learn/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)