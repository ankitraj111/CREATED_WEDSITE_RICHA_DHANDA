import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/demo"],
      },
    ],
    sitemap: "https://www.advocaterichadhanda.com/sitemap.xml",
    host: "https://www.advocaterichadhanda.com",
  };
}
