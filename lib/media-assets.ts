export const mediaAssets = [
  { key: "favicon", label: "Favicon del navegador", fallbackPath: "/favicon.png" },
  { key: "logo", label: "Logotipo principal", fallbackPath: "/logo.png" },
  { key: "hero", label: "Imagen principal", fallbackPath: "/images/hero/hero_occupational.png" },
  { key: "team", label: "Equipo Vigmedical", fallbackPath: "/vigmedical_team.png" },
  { key: "about", label: "Página Nosotros", fallbackPath: "/about_team.png" },
  { key: "medical-training", label: "Capacitación médica", fallbackPath: "/medical_training.png" },
  { key: "sst-training", label: "Capacitación SST", fallbackPath: "/sst_training.png" },
] as const;

export type MediaAssetKey = (typeof mediaAssets)[number]["key"];

export function isMediaAssetKey(value: string): value is MediaAssetKey {
  return mediaAssets.some((asset) => asset.key === value);
}

export function managedMediaUrl(key: MediaAssetKey) {
  return `/api/media/${key}`;
}
