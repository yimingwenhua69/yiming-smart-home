import { deviceModels, sources } from "@/data/catalog";

export type AssetLifecycle = "current" | "needs-review" | "superseded" | "withdrawn";
export type RightsStatus = "cleared" | "open-license" | "permission-required" | "unverified";

export type MediaAsset = {
  id: string;
  deviceModelId: string;
  kind: "image" | "video" | "diagram";
  sourceId: string;
  sourceUrl: string;
  publisher: string;
  capturedAt: string | null;
  checkedAt: string;
  rightsStatus: RightsStatus;
  license: string | null;
  attribution: string | null;
  provenance: "manufacturer-original" | "licensed-photo" | "studio-photo" | "technical-document";
  lifecycle: AssetLifecycle;
  localPath: string | null;
  notes: string;
};

export type ThreeDAsset = {
  id: string;
  deviceModelId: string;
  format: "glb" | "gltf" | "step" | "obj";
  sourceId: string;
  sourceUrl: string;
  publisher: string;
  provenance: "manufacturer-cad" | "physical-scan" | "verified-reconstruction";
  rightsStatus: RightsStatus;
  license: string | null;
  checkedAt: string;
  lifecycle: AssetLifecycle;
  localPath: string | null;
  accuracyNotes: string;
};

export type PhotometricProfile = {
  id: string;
  deviceModelId: string;
  format: "ies" | "ldt";
  sourceId: string;
  sourceUrl: string;
  publisher: string;
  luminaireVariant: string;
  opticalVersion: string;
  checkedAt: string;
  rightsStatus: RightsStatus;
  license: string | null;
  lifecycle: AssetLifecycle;
  localPath: string | null;
  testStandard: string | null;
  notes: string;
};

export const mediaAssets: MediaAsset[] = [];
export const threeDAssets: ThreeDAsset[] = [];
export const photometricProfiles: PhotometricProfile[] = [];

export function getMediaAssetsForModel(deviceModelId: string) {
  return mediaAssets.filter((asset) => asset.deviceModelId === deviceModelId);
}

export function getVerifiedImagesForModel(deviceModelId: string) {
  return getMediaAssetsForModel(deviceModelId).filter((asset) =>
    asset.kind === "image" &&
    (asset.rightsStatus === "cleared" || asset.rightsStatus === "open-license") &&
    asset.lifecycle === "current" &&
    asset.localPath !== null
  );
}

export function getVerifiedThreeDAsset(deviceModelId: string) {
  return threeDAssets.find((asset) =>
    asset.deviceModelId === deviceModelId &&
    (asset.rightsStatus === "cleared" || asset.rightsStatus === "open-license") &&
    asset.lifecycle === "current" &&
    asset.localPath !== null
  );
}

export function getVerifiedPhotometricProfile(deviceModelId: string) {
  return photometricProfiles.find((asset) =>
    asset.deviceModelId === deviceModelId &&
    (asset.rightsStatus === "cleared" || asset.rightsStatus === "open-license") &&
    asset.lifecycle === "current" &&
    asset.localPath !== null
  );
}

export function validateAssetRegistry() {
  const errors: string[] = [];
  const knownModels = new Set(deviceModels.map((model) => model.id));
  const knownSources = new Set(sources.map((source) => source.id));
  const all = [...mediaAssets, ...threeDAssets, ...photometricProfiles];
  const ids = new Set<string>();
  for (const asset of all) {
    if (ids.has(asset.id)) errors.push("duplicate asset id: " + asset.id);
    ids.add(asset.id);
    if (!knownModels.has(asset.deviceModelId)) errors.push(asset.id + " references unknown device model " + asset.deviceModelId);
    if (!knownSources.has(asset.sourceId)) errors.push(asset.id + " references unknown source " + asset.sourceId);
    if (!asset.sourceUrl.startsWith("https://")) errors.push(asset.id + " source URL must use HTTPS");
    if (asset.localPath && !asset.localPath.startsWith("/")) errors.push(asset.id + " localPath must be a site-root path");
    if ((asset.rightsStatus === "cleared" || asset.rightsStatus === "open-license") && !asset.license) errors.push(asset.id + " must record the license");
    if (asset.lifecycle === "current" && asset.rightsStatus !== "cleared" && asset.rightsStatus !== "open-license") errors.push(asset.id + " cannot be current without cleared rights");
  }
  return { valid: errors.length === 0, errors };
}
