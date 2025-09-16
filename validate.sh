#!/bin/bash

echo "🔍 Validating Apollo Prisma Boilerplate"
echo "======================================="

# Check Node.js version
echo "✅ Node.js $(node --version)"
echo "✅ npm $(npm --version)"

# Check if package.json is valid
echo "📦 Validating package.json..."
if node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))" 2>/dev/null; then
    echo "✅ package.json is valid"
else
    echo "❌ package.json is invalid"
    exit 1
fi

# Check if TypeScript config is valid
echo "🔧 Validating tsconfig.json..."
if node -e "JSON.parse(require('fs').readFileSync('tsconfig.json', 'utf8'))" 2>/dev/null; then
    echo "✅ tsconfig.json is valid"
else
    echo "❌ tsconfig.json is invalid"
    exit 1
fi

# Check if Prisma schema is valid
echo "🗄️  Validating Prisma schema..."
if [ -f "prisma/schema.prisma" ]; then
    echo "✅ Prisma schema exists"
else
    echo "❌ Prisma schema not found"
    exit 1
fi

# Check if Docker files exist
echo "🐳 Validating Docker configuration..."
if [ -f "Dockerfile" ] && [ -f "docker-compose.yml" ]; then
    echo "✅ Docker files exist"
else
    echo "❌ Docker files missing"
    exit 1
fi

# Check if all source files exist
echo "📁 Validating source structure..."
required_files=(
    "src/index.ts"
    "src/context.ts"
    "src/config/index.ts"
    "src/schema/index.ts"
    "src/schema/base.ts"
    "src/schema/user.ts"
    "src/schema/ride.ts"
    "src/resolvers/index.ts"
    "src/resolvers/user.ts"
    "src/resolvers/ride.ts"
    "prisma/schema.prisma"
    "prisma/seed.ts"
    ".env.example"
    "README.md"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

# TypeScript syntax check
echo "🔍 Running TypeScript syntax check..."
if npm run type-check; then
    echo "✅ TypeScript syntax is valid"
else
    echo "❌ TypeScript syntax errors found"
    exit 1
fi

# Build check
echo "🏗️  Testing build process..."
if npm run build; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "🎉 All validations passed!"
echo "💡 Run 'npm run setup' to start the development environment"
echo "💡 Or run 'docker compose up' to use Docker"