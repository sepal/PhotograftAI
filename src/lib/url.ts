export function getAppDomain() {
  if (process.env.NODE_ENV === "development") {
    if (!process.env.DEV_URL) {
      throw new Error("DEV_URL is not defined");
    }
    return process.env.DEV_URL;
  }

  if (!process.env.VERCEL_URL) {
    throw new Error("VERCEL_URL is not defined");
  }

  return `https://${process.env.VERCEL_URL}`;
}
