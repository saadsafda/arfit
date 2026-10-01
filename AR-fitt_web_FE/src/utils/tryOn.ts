/** Hosted WebAR experiences must be opened on Snap's site; they are not Camera Kit Lens IDs. */
export const getHostedTryOnUrl = (lensId?: string | null): string | null => {
  if (!lensId) return null;

  try {
    const url = new URL(lensId);
    if (
      url.protocol === "https:" &&
      url.hostname === "lens.snap.com" &&
      /^\/experience\/[0-9a-f-]{36}\/?$/i.test(url.pathname)
    ) {
      return url.href;
    }
  } catch {
    // Camera Kit Lens IDs are not URLs.
  }

  return null;
};

/** Camera Kit needs a bare Lens ID; hosted Snap links carry the lens UUID in their path. */
export const getCameraKitLensId = (lensId?: string | null): string => {
  const hostedUrl = getHostedTryOnUrl(lensId);
  if (!hostedUrl) return lensId ?? "";
  return new URL(hostedUrl).pathname.split("/").filter(Boolean)[1] ?? "";
};
