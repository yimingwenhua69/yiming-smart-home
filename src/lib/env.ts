import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.url().refine((url) => ["postgres:", "postgresql:"].includes(new URL(url).protocol), "DATABASE_URL must use PostgreSQL"),
});

export function getEnvironment() {
  return schema.parse({ DATABASE_URL: process.env.DATABASE_URL });
}
