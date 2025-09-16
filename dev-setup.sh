#!/bin/bash

echo "🚀 Starting Apollo Prisma Development Environment"
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Node.js $(node --version) detected"
echo "✅ npm $(npm --version) detected"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

# Check if PostgreSQL is running
echo "🔍 Checking PostgreSQL connection..."
if docker ps | grep -q postgres || pg_isready &> /dev/null; then
    echo "✅ PostgreSQL is running"
else
    echo "🐳 Starting PostgreSQL with Docker..."
    docker compose -f docker-compose.dev.yml up -d
    if [ $? -ne 0 ]; then
        echo "❌ Failed to start PostgreSQL. Please ensure Docker is running."
        echo "💡 Alternative: Install PostgreSQL locally and update DATABASE_URL in .env"
        exit 1
    fi
    echo "⏳ Waiting for PostgreSQL to be ready..."
    sleep 10
fi

# Copy .env.example to .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📄 Creating .env file from .env.example..."
    cp .env.example .env
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate 2>/dev/null || echo "⚠️  Prisma generate failed - continuing anyway"

# Run migrations
echo "🗄️  Running database migrations..."
npx prisma migrate dev --name init 2>/dev/null || echo "⚠️  Migration failed - continuing anyway"

# Seed database
echo "🌱 Seeding database..."
npm run db:seed 2>/dev/null || echo "⚠️  Database seeding failed - continuing anyway"

echo ""
echo "🎉 Setup complete! Starting development server..."
echo "📊 GraphQL Playground: http://localhost:4000/graphql"
echo "🔍 Health Check: http://localhost:4000/health"
echo "🛠️  Prisma Studio: Run 'npm run studio' in another terminal"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start development server
npm run dev