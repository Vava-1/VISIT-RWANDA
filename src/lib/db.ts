import { PrismaClient } from '@prisma/client'

// Lazy, defensive Prisma client. On serverless platforms (Vercel) the DB is
// optional: if DATABASE_URL is missing or the connection fails, we return null
// and the API routes skip persistence rather than crashing the AI features.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | null | undefined
}

function createPrisma(): PrismaClient | null {
  try {
    const url = process.env.DATABASE_URL
    if (!url) return null
    return new PrismaClient({ log: ['error'] })
  } catch {
    return null
  }
}

export const db: PrismaClient | null =
  globalForPrisma.prisma === undefined
    ? (globalForPrisma.prisma = createPrisma())
    : globalForPrisma.prisma

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}
