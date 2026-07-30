export const studioUrl = "/studio";

const datasetEnv = process.env.NEXT_PUBLIC_SANITY_DATASET || "";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-29";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = datasetEnv || "production";
export const isSanityConfigured = Boolean(projectId && datasetEnv);
