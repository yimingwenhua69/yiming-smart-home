import { z } from "zod";
import { capabilities, categories, manufacturers, platforms, products, protocols, sources } from "@/data/catalog";

const id = z.string().trim().min(1);
const httpsUrl = z.string().url().refine((value)=>value.startsWith("https://"),"source URL must use HTTPS");
const evidence = z.enum(["official","documented","community","lab-tested","field-tested"]);

const sourceSchema = z.object({
  id, publisher: z.string().min(1), title: z.string().min(1), url: httpsUrl,
  sourceType: z.enum(["official-product-catalog","official-specification","official-compatibility","open-database","standard"]),
  evidenceLevel: evidence, checkedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  region: z.enum(["CN","GLOBAL"]), notes: z.string()
});
const manufacturerSchema = z.object({
  id, name: z.string().min(1), englishName: z.string().min(1), website: httpsUrl,
  productCenter: httpsUrl, country: z.string().min(1), status: z.enum(["active","researching"]), note: z.string()
});
const categorySchema = z.object({ id, name: z.string().min(1), description: z.string(), subcategories: z.array(z.string().min(1)) });
const productSchema = z.object({
  id, slug: z.string().regex(/^[a-z0-9-]+$/), name: z.string().min(1), model: z.string().nullable(),
  manufacturerId: id, brand: z.string().min(1), categoryId: id, summary: z.string(),
  protocolIds: z.array(id), platformIds: z.array(id), capabilityIds: z.array(id), sourceIds: z.array(id).min(1),
  evidenceLevel: evidence, verificationStatus: z.enum(["official-listing","official-specification","needs-model-verification"]),
  lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), region: z.literal("CN"),
  price: z.null(), image: z.null(), threeDAsset: z.null(),
  specifications: z.array(z.object({name:z.string().min(1),value:z.string().min(1),sourceId:id})),
  limitations: z.array(z.string().min(1))
});
const protocolSchema = z.object({ id, name: z.string().min(1), family: z.string(), summary: z.string(), transport: z.string(), topology: z.string(), sourceIds: z.array(id), cautions: z.array(z.string()) });
const platformSchema = z.object({ id, name: z.string(), owner: z.string(), summary: z.string(), link: httpsUrl, integration: z.string(), cautions: z.array(z.string()) });
const capabilitySchema = z.object({ id, name: z.string(), valueType: z.string() });

export function validateCatalog() {
  const errors: string[] = [];
  const collections = [
    ["source",sources,sourceSchema],
    ["manufacturer",manufacturers,manufacturerSchema],
    ["category",categories,categorySchema],
    ["product",products,productSchema],
    ["protocol",protocols,protocolSchema],
    ["platform",platforms,platformSchema],
    ["capability",capabilities,capabilitySchema]
  ] as const;
  const ids = new Map<string,Set<string>>();
  for (const [name,items,schema] of collections) {
    const seen=new Set<string>();
    for (const item of items) {
      const parsed=schema.safeParse(item);
      if(!parsed.success) errors.push(name+" "+item.id+": "+parsed.error.issues.map((issue)=>issue.path.join(".")+" "+issue.message).join("; "));
      if(seen.has(item.id)) errors.push("duplicate "+name+" id: "+item.id);
      seen.add(item.id);
    }
    ids.set(name,seen);
  }
  const sourceIds=ids.get("source")??new Set<string>();
  const manufacturerIds=ids.get("manufacturer")??new Set<string>();
  const categoryIds=ids.get("category")??new Set<string>();
  const protocolIds=ids.get("protocol")??new Set<string>();
  const platformIds=ids.get("platform")??new Set<string>();
  const capabilityIds=ids.get("capability")??new Set<string>();
  for(const product of products){
    if(!manufacturerIds.has(product.manufacturerId)) errors.push(product.id+" references missing manufacturer "+product.manufacturerId);
    if(!categoryIds.has(product.categoryId)) errors.push(product.id+" references missing category "+product.categoryId);
    for(const relation of product.sourceIds) if(!sourceIds.has(relation)) errors.push(product.id+" references missing source "+relation);
    for(const relation of product.protocolIds) if(!protocolIds.has(relation)) errors.push(product.id+" references missing protocol "+relation);
    for(const relation of product.platformIds) if(!platformIds.has(relation)) errors.push(product.id+" references missing platform "+relation);
    for(const relation of product.capabilityIds) if(!capabilityIds.has(relation)) errors.push(product.id+" references missing capability "+relation);
    for(const spec of product.specifications) if(!sourceIds.has(spec.sourceId)) errors.push(product.id+" specification references missing source "+spec.sourceId);
  }
  for(const protocol of protocols) for(const relation of protocol.sourceIds) if(!sourceIds.has(relation)) errors.push(protocol.id+" references missing source "+relation);
  return { valid: errors.length===0, errors };
}
