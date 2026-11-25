import { z } from "zod";
import { brands, capabilities, categories, compatibilityRecords, deviceModels, deviceVerifications, hardwareRevisions, integrationMethods, integrationSystems, manufacturers, platforms, productSpecifications, products, protocols, sources } from "@/data/catalog";

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
const integrationSystemSchema = z.object({ id, name: z.string().min(1), kind: z.enum(["manufacturer-sdk","manufacturer-bridge","platform-sdk","open-source-integration","platform-api"]), owner: z.string().min(1), documentationUrl: httpsUrl, notes: z.string() });
const integrationMethodSchema = z.object({ id, name: z.string().min(1), description: z.string(), securityNotes: z.string() });
const integrationMappingSchema = z.object({ integrationId: id, modelId: id, sourceId: id });
const hardwareRevisionSchema = z.object({
  id, deviceModelId: id, revisionCode: id, region: z.enum(["CN","GLOBAL"]),
  sourceIds: z.array(id).min(1), evidenceLevel: evidence,
  checkedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), notes: z.string()
});
const specificationSchema = z.object({
  id, deviceModelId: id, name: z.string().min(1), value: z.string().min(1),
  unit: z.string().nullable(), sourceId: id, evidenceLevel: evidence,
  checkedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), notes: z.string()
});
const compatibilitySchema = z.object({
  id, deviceModelId: id, targetType: z.enum(["platform","integration"]), targetId: id,
  status: z.enum(["supported","partial","unsupported","unverified"]), methodId: id.nullable(), evidenceLevel: evidence,
  sourceId: id, features: z.array(z.string()), checkedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), notes: z.string()
});
const verificationSchema = z.object({
  id, deviceModelId: id, verificationType: z.enum(["pairing","functional","network","performance","field-installation"]),
  result: z.enum(["pass","fail","partial","not-tested"]), evidenceLevel: z.enum(["lab-tested","field-tested"]),
  testedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), hardwareRevisionId: id.nullable(),
  firmwareVersion: z.string().nullable(), environment: z.string(), steps: z.array(z.string()),
  observations: z.array(z.string()), sourceIds: z.array(id).min(1)
});
const deviceModelSchema = z.object({
  id, productId: id, modelCode: z.string().nullable(), hardwareRevisionIds: z.array(id),
  integrationModels: z.array(integrationMappingSchema), protocolIds: z.array(id),
  capabilityIds: z.array(id), sourceIds: z.array(id).min(1), specificationIds: z.array(id),
  compatibilityRecordIds: z.array(id), verificationIds: z.array(id),
  evidenceLevel: evidence, verificationStatus: z.enum(["official-listing","official-specification","needs-model-verification"]),
  lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), region: z.literal("CN"),
  price: z.null(), image: z.null(), threeDAsset: z.null(), limitations: z.array(z.string().min(1))
});
const protocolSchema = z.object({ id, name: z.string().min(1), family: z.string(), summary: z.string(), transport: z.string(), topology: z.string(), sourceIds: z.array(id), cautions: z.array(z.string()) });
const platformSchema = z.object({ id, name: z.string(), owner: z.string(), summary: z.string(), link: httpsUrl, integration: z.string(), cautions: z.array(z.string()) });
const capabilitySchema = z.object({ id, name: z.string(), valueType: z.string() });

export const catalogRegistry = {
  sources, integrationSystems, integrationMethods, manufacturers, brands, categories, products, deviceModels,
  hardwareRevisions, productSpecifications, compatibilityRecords, deviceVerifications,
  protocols, platforms, capabilities
};

export function validateCatalog(registry: typeof catalogRegistry = catalogRegistry) {
  const {
    sources, integrationSystems, integrationMethods, manufacturers, brands, categories, products, deviceModels,
    hardwareRevisions, productSpecifications, compatibilityRecords, deviceVerifications,
    protocols, platforms, capabilities
  } = registry;
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
  checkCollection("integration-method",integrationMethods,integrationMethodSchema);
  checkCollection("manufacturer",manufacturers,manufacturerSchema);
  checkCollection("brand",brands,brandSchema);
  checkCollection("category",categories,categorySchema);
  checkCollection("product",products,productSchema);
  checkCollection("device-model",deviceModels,deviceModelSchema);
  checkCollection("hardware-revision",hardwareRevisions,hardwareRevisionSchema);
  checkCollection("product-specification",productSpecifications,specificationSchema);
  checkCollection("compatibility-record",compatibilityRecords,compatibilitySchema);
  checkCollection("device-verification",deviceVerifications,verificationSchema);
  checkCollection("protocol",protocols,protocolSchema);
  checkCollection("platform",platforms,platformSchema);
  checkCollection("capability",capabilities,capabilitySchema);

  const sourceIds=ids.get("source")??new Set<string>();
  const integrationSystemIds=ids.get("integration-system")??new Set<string>();
  const integrationMethodIds=ids.get("integration-method")??new Set<string>();
  const manufacturerIds=ids.get("manufacturer")??new Set<string>();
  const brandIds=ids.get("brand")??new Set<string>();
  const categoryIds=ids.get("category")??new Set<string>();
  const productIds=ids.get("product")??new Set<string>();
  const modelIds=ids.get("device-model")??new Set<string>();
  const revisionIds=ids.get("hardware-revision")??new Set<string>();
  const specificationIds=ids.get("product-specification")??new Set<string>();
  const compatibilityIds=ids.get("compatibility-record")??new Set<string>();
  const verificationIds=ids.get("device-verification")??new Set<string>();
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
    for(const relation of model.capabilityIds) if(!capabilityIds.has(relation)) errors.push(model.id+" references missing capability "+relation);
    for(const relation of model.hardwareRevisionIds){
      if(!revisionIds.has(relation)) errors.push(model.id+" references missing hardware revision "+relation);
      else if(hardwareRevisions.find((revision)=>revision.id===relation)?.deviceModelId!==model.id) errors.push(model.id+" hardware revision parent mismatch "+relation);
    }
    for(const relation of model.specificationIds){
      if(!specificationIds.has(relation)) errors.push(model.id+" references missing specification "+relation);
      else if(productSpecifications.find((specification)=>specification.id===relation)?.deviceModelId!==model.id) errors.push(model.id+" specification parent mismatch "+relation);
    }
    for(const relation of model.compatibilityRecordIds){
      if(!compatibilityIds.has(relation)) errors.push(model.id+" references missing compatibility record "+relation);
      else if(compatibilityRecords.find((record)=>record.id===relation)?.deviceModelId!==model.id) errors.push(model.id+" compatibility parent mismatch "+relation);
    }
    for(const relation of model.verificationIds){
      if(!verificationIds.has(relation)) errors.push(model.id+" references missing verification "+relation);
      else if(deviceVerifications.find((verification)=>verification.id===relation)?.deviceModelId!==model.id) errors.push(model.id+" verification parent mismatch "+relation);
    }
  }
  for(const revision of hardwareRevisions){
    if(!modelIds.has(revision.deviceModelId)) errors.push(revision.id+" references missing device model "+revision.deviceModelId);
    for(const sourceId of revision.sourceIds) if(!sourceIds.has(sourceId)) errors.push(revision.id+" references missing source "+sourceId);
  }
  for(const specification of productSpecifications){
    if(!modelIds.has(specification.deviceModelId)) errors.push(specification.id+" references missing device model "+specification.deviceModelId);
    if(!sourceIds.has(specification.sourceId)) errors.push(specification.id+" references missing source "+specification.sourceId);
  }
  for(const record of compatibilityRecords){
    if(!modelIds.has(record.deviceModelId)) errors.push(record.id+" references missing device model "+record.deviceModelId);
    if(!sourceIds.has(record.sourceId)) errors.push(record.id+" references missing source "+record.sourceId);
    if(record.targetType==="platform"&&!platformIds.has(record.targetId)) errors.push(record.id+" references missing platform "+record.targetId);
    if(record.targetType==="integration"&&!integrationSystemIds.has(record.targetId)) errors.push(record.id+" references missing integration "+record.targetId);
    if(record.methodId&&!integrationMethodIds.has(record.methodId)) errors.push(record.id+" references missing integration method "+record.methodId);
  }
  for(const verification of deviceVerifications){
    if(!modelIds.has(verification.deviceModelId)) errors.push(verification.id+" references missing device model "+verification.deviceModelId);
    if(verification.hardwareRevisionId&&!revisionIds.has(verification.hardwareRevisionId)) errors.push(verification.id+" references missing hardware revision "+verification.hardwareRevisionId);
    for(const sourceId of verification.sourceIds) if(!sourceIds.has(sourceId)) errors.push(verification.id+" references missing source "+sourceId);
  }
  for(const protocol of protocols) for(const relation of protocol.sourceIds) if(!sourceIds.has(relation)) errors.push(protocol.id+" references missing source "+relation);
  return { valid: errors.length===0, errors };
}
