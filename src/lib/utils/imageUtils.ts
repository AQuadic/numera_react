export interface ApiImage {
  url?: string;
  responsive_urls?: string[];
  // Allow other properties that might come from the API
  [key: string]: any;
}

export type ImageSize = "small" | "medium" | "large" | "thumbnail";

/**
 * Gets the most appropriate responsive URL based on the requested size.
 * - 'large' -> largest available (index 0)
 * - 'medium' -> middle quality
 * - 'small' -> lower quality (~2/3 down the list)
 * - 'thumbnail' -> smallest available (last index)
 */
export function getResponsiveImageUrl(
  image: ApiImage | null | undefined,
  size: ImageSize = "medium"
): string {
  if (!image) return "";

  const urls = image.responsive_urls;

  // Use main url if no responsive urls are present
  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return image.url || "";
  }

  const count = urls.length;
  let index = 0;

  switch (size) {
    case "large":
      index = 0;
      break;
    case "medium":
      // Approximately middle index
      index = Math.floor((count - 1) / 2);
      break;
    case "small":
      // Approximately 2/3rds index
      index = Math.floor((count - 1) * (2 / 3));
      break;
    case "thumbnail":
      // Last index (smallest)
      index = count - 1;
      break;
    default:
      index = 0;
  }

  // Ensure index is within valid bounds
  index = Math.max(0, Math.min(index, count - 1));

  return urls[index] || image.url || "";
}

/**
 * Helper to get standard img props (src) for an ApiImage.
 */
export function getImgProps(
  image: ApiImage | null | undefined,
  alt: string = "",
  preferredSize: ImageSize = "medium"
) {
  if (!image) {
    return { src: "", alt };
  }

  const src = getResponsiveImageUrl(image, preferredSize);

  return {
    src,
    alt,
  };
}

/**
 * Generates the URL for a plate image based on its properties.
 * Used as a fallback when the API doesn't provide an image_url.
 */
export function getPlateImageUrl(plate: {
  letters?: string;
  numbers?: string;
  emirate_id?: string;
  emirate?: string;
  vehicle_type?: string;
}) {
  const letters = plate.letters || "";
  const numbers = plate.numbers || "";
  const emirate = plate.emirate_id || plate.emirate || "dubai";
  const type = plate.vehicle_type || "cars";

  return `https://numra.motofy.io/plate-generate/${type}/${letters}/${numbers}/${emirate}`;
}
