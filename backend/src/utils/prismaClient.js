// lib/prismaClient.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Ensuring we handle proper disconnection when the app shuts down
const gracefulShutdown = async () => {
  await prisma.$disconnect();
};

// Handling graceful shutdown
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Export Prisma client using module.exports
module.exports = prisma;
