/**
 * Utility functions for handling responsive images from the API
 */

/**
 * Gets the most appropriate responsive URL based on the requested size
 * @param responsiveUrls - Array of responsive URLs from the API
 * @param fallbackUrl - Original URL to use if no responsive URLs are available
 * @param preferredSize - Preferred image size ('small' | 'medium' | 'large')
 * @returns The most appropriate image URL
 */
export function getResponsiveImageUrl(
  responsiveUrls: string[] | undefined,
  fallbackUrl: string,
  preferredSize: "small" | "medium" | "large" = "medium"
): string {
  if (!responsiveUrls || responsiveUrls.length === 0) {
    return fallbackUrl;
  }

  // Responsive URLs are typically ordered from largest to smallest
  // Index 0: 980x980, Index 1: 819x819, Index 2: 685x685
  const sizeIndexMap = {
    large: 0, // 980x980
    medium: 1, // 819x819
    small: 2, // 685x685
  };

  const index = sizeIndexMap[preferredSize];
  return responsiveUrls[index] || responsiveUrls[0] || fallbackUrl;
}

/**
 * Generates srcSet string for Next.js Image component
 * @param responsiveUrls - Array of responsive URLs from the API
 * @returns srcSet string or undefined if no responsive URLs
 */
export function generateSrcSet(
  responsiveUrls: string[] | undefined
): string | undefined {
  if (!responsiveUrls || responsiveUrls.length === 0) {
    return undefined;
  }

  // Assuming the API returns URLs in descending order of size
  // Index 0: 980w, Index 1: 819w, Index 2: 685w
  const sizes = [980, 819, 685];

  return responsiveUrls
    .map((url, index) => {
      const width = sizes[index] || sizes.at(-1);
      return `${url} ${width}w`;
    })
    .join(", ");
}

/**
 * Gets the best image source and srcSet for use with Next.js Image component
 * @param responsiveUrls - Array of responsive URLs from the API
 * @param fallbackUrl - Original URL to use if no responsive URLs are available
 * @param preferredSize - Preferred image size for the src attribute
 * @returns Object with src and srcSet properties
 */
export function getImageProps(
  responsiveUrls: string[] | undefined,
  fallbackUrl: string,
  preferredSize: "small" | "medium" | "large" = "medium"
) {
  const src = getResponsiveImageUrl(responsiveUrls, fallbackUrl, preferredSize);
  const srcSet = generateSrcSet(responsiveUrls);

  return {
    src,
    ...(srcSet && { srcSet }),
  };
}

/**
 * Type guard to check if an image object has responsive URLs
 */
export function hasResponsiveUrls(
  image: { url: string; responsive_urls?: string[] } | undefined | null
): image is { url: string; responsive_urls: string[] } {
  return (
    !!image &&
    !!image.responsive_urls &&
    Array.isArray(image.responsive_urls) &&
    image.responsive_urls.length > 0
  );
}
