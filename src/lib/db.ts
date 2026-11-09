import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { getEnvironment } from "./env";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function getDatabase() {
  if (!globalForPrisma.prisma) {
    const adapter = new PrismaPg({ connectionString: getEnvironment().DATABASE_URL, connectionTimeoutMillis: 3000, query_timeout: 3000 });
    globalForPrisma.prisma = new PrismaClient({ adapter });
  }
  return globalForPrisma.prisma;
}
