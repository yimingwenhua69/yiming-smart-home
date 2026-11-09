import { z } from "zod";

export const deviceListQuery = z.object({
  q: z.string().trim().max(100).optional(),
  category: z.string().trim().max(50).optional(),
  protocol: z.string().trim().max(50).optional(),
  tag: z.string().trim().max(50).optional(),
  sort: z.enum(["name", "price", "newest"]).default("name"),
  order: z.enum(["asc", "desc"]).default("asc"),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
});

export type DeviceListQuery = z.infer<typeof deviceListQuery>;
