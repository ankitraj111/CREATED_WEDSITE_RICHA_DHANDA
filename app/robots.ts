import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/demo"],
      },
      // OpenAI / ChatGPT Search Bots
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User"],
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Google & Google Gemini AI Bots
      {
        userAgent: ["Googlebot", "Google-Extended"],
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Anthropic / Claude AI Bots
      {
        userAgent: ["ClaudeBot", "anthropic-ai"],
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Perplexity AI Bot
      {
        userAgent: ["PerplexityBot"],
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Microsoft Bing & Copilot Bots
      {
        userAgent: ["Bingbot", "msnbot"],
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Apple Siri & Intelligence Bot
      {
        userAgent: ["Applebot", "Applebot-Extended"],
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://www.advocaterichadhanda.com/sitemap.xml",
    host: "https://www.advocaterichadhanda.com",
  };
}
