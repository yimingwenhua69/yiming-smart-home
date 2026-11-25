import { z } from "zod";
import { brands, capabilities, categories, deviceModels, integrationSystems, manufacturers, platforms, products, protocols, sources } from "@/data/catalog";

const id = z.string().trim().min(1);
const httpsUrl = z.string().url().refine((value)=>value.startsWith("https://"),"URL must use HTTPS");
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
const brandSchema = z.object({ id, name: z.string().min(1), manufacturerId: id, website: httpsUrl, note: z.string() });
const categorySchema = z.object({ id, name: z.string().min(1), description: z.string(), subcategories: z.array(z.string().min(1)) });
const productSchema = z.object({
  id, slug: z.string().regex(/^[a-z0-9-]+$/), name: z.string().min(1),
  manufacturerId: id, brandId: id, categoryId: id, summary: z.string(), modelIds: z.array(id).min(1)
});
const integrationSystemSchema = z.object({ id, name: z.string().min(1), kind: z.enum(["manufacturer-sdk","open-source-integration","platform-api"]), owner: z.string().min(1), documentationUrl: httpsUrl, notes: z.string() });
const integrationMappingSchema = z.object({ integrationId: id, modelId: id, sourceId: id });
const deviceModelSchema = z.object({
  id, productId: id, modelCode: z.string().nullable(), hardwareRevision: z.string().nullable(), integrationModels: z.array(integrationMappingSchema),
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
  const ids = new Map<string,Set<string>>();
  const checkCollection=(name:string,items:readonly {id:string}[],schema:z.ZodType)=>{
    const seen=new Set<string>();
    for(const item of items){
      const parsed=schema.safeParse(item);
      if(!parsed.success) errors.push(name+" "+item.id+": "+parsed.error.issues.map((issue)=>issue.path.join(".")+" "+issue.message).join("; "));
      if(seen.has(item.id)) errors.push("duplicate "+name+" id: "+item.id);
      seen.add(item.id);
    }
    ids.set(name,seen);
  };
  checkCollection("source",sources,sourceSchema);
  checkCollection("integration-system",integrationSystems,integrationSystemSchema);
  checkCollection("manufacturer",manufacturers,manufacturerSchema);
  checkCollection("brand",brands,brandSchema);
  checkCollection("category",categories,categorySchema);
  checkCollection("product",products,productSchema);
  checkCollection("device-model",deviceModels,deviceModelSchema);
  checkCollection("protocol",protocols,protocolSchema);
  checkCollection("platform",platforms,platformSchema);
  checkCollection("capability",capabilities,capabilitySchema);

  const sourceIds=ids.get("source")??new Set<string>();
  const integrationSystemIds=ids.get("integration-system")??new Set<string>();
  const manufacturerIds=ids.get("manufacturer")??new Set<string>();
  const brandIds=ids.get("brand")??new Set<string>();
  const categoryIds=ids.get("category")??new Set<string>();
  const productIds=ids.get("product")??new Set<string>();
  const modelIds=ids.get("device-model")??new Set<string>();
  const protocolIds=ids.get("protocol")??new Set<string>();
  const platformIds=ids.get("platform")??new Set<string>();
  const capabilityIds=ids.get("capability")??new Set<string>();

  for(const brand of brands) if(!manufacturerIds.has(brand.manufacturerId)) errors.push(brand.id+" references missing manufacturer "+brand.manufacturerId);
  for(const product of products){
    if(!manufacturerIds.has(product.manufacturerId)) errors.push(product.id+" references missing manufacturer "+product.manufacturerId);
    if(!brandIds.has(product.brandId)) errors.push(product.id+" references missing brand "+product.brandId);
    else if(brands.find((brand)=>brand.id===product.brandId)?.manufacturerId!==product.manufacturerId) errors.push(product.id+" brand/manufacturer ownership mismatch");
    if(!categoryIds.has(product.categoryId)) errors.push(product.id+" references missing category "+product.categoryId);
    for(const modelId of product.modelIds){
      if(!modelIds.has(modelId)) errors.push(product.id+" references missing device model "+modelId);
      else if(deviceModels.find((model)=>model.id===modelId)?.productId!==product.id) errors.push(product.id+" device model parent mismatch "+modelId);
    }
  }
  for(const model of deviceModels){
    if(!productIds.has(model.productId)) errors.push(model.id+" references missing product "+model.productId);
    for(const relation of model.sourceIds) if(!sourceIds.has(relation)) errors.push(model.id+" references missing source "+relation);
    for(const mapping of model.integrationModels){
      if(!integrationSystemIds.has(mapping.integrationId)) errors.push(model.id+" references missing integration system "+mapping.integrationId);
      if(!sourceIds.has(mapping.sourceId)) errors.push(model.id+" integration mapping references missing source "+mapping.sourceId);
    }
    for(const relation of model.protocolIds) if(!protocolIds.has(relation)) errors.push(model.id+" references missing protocol "+relation);
    for(const relation of model.platformIds) if(!platformIds.has(relation)) errors.push(model.id+" references missing platform "+relation);
    for(const relation of model.capabilityIds) if(!capabilityIds.has(relation)) errors.push(model.id+" references missing capability "+relation);
    for(const spec of model.specifications) if(!sourceIds.has(spec.sourceId)) errors.push(model.id+" specification references missing source "+spec.sourceId);
  }
  for(const protocol of protocols) for(const relation of protocol.sourceIds) if(!sourceIds.has(relation)) errors.push(protocol.id+" references missing source "+relation);
  return { valid: errors.length===0, errors };
}
