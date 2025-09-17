#!/bin/bash

# Combine schema files
echo "// This file is auto-generated. Do not edit directly." > prisma/schema.prisma
echo "// Generated on $(date)" >> prisma/schema.prisma
echo "" >> prisma/schema.prisma

# Add generator and datasource
cat << 'EOF' >> prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

EOF

# Combine all model files
for file in prisma/models/*.prisma; do
  echo "// Including models from $(basename "$file")" >> prisma/schema.prisma
  cat "$file" >> prisma/schema.prisma
  echo "" >> prisma/schema.prisma
done