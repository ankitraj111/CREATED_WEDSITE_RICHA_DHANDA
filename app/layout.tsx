import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.advocaterichadhanda.com"),
  verification: {
    google: "7GCg_qC9a41_8yBe_-48HZ-Lwz5TLJN9suN-zNHFFnc",
  },
  title: {
    default: "Advocate Richa Dhanda — Expert Immigration Lawyer | Kurukshetra",
    template: "%s | Advocate Richa Dhanda",
  },
  description:
    "Advocate Richa Dhanda (Bar Council Reg. PH/1260/2025) — Expert Immigration Lawyer in Kurukshetra, Haryana. Visa applications, PR, citizenship, work permits with LL.M expertise. Book online consultation.",
  keywords: [
    "immigration lawyer Kurukshetra",
    "Richa Dhanda advocate",
    "advocate Richa Dhanda",
    "immigration advocate Haryana",
    "visa lawyer Kurukshetra",
    "PR application lawyer India",
    "citizenship lawyer Kurukshetra",
    "work visa legal help India",
    "immigration law expert Haryana",
    "Bar Council registered immigration lawyer",
    "LL.M immigration advocate Kurukshetra",
    "best immigration lawyer near me",
  ],
  authors: [{ name: "Advocate Richa Dhanda", url: "https://www.advocaterichadhanda.com" }],
  creator: "Advocate Richa Dhanda",
  publisher: "Advocate Richa Dhanda",
  alternates: {
    canonical: "https://www.advocaterichadhanda.com",
  },
  openGraph: {
    title: "Advocate Richa Dhanda — Expert Immigration Lawyer | Kurukshetra",
    description:
      "Expert immigration legal representation. LL.M qualified immigration advocate in Kurukshetra, Haryana. Visa, PR, citizenship & work permits.",
    type: "website",
    url: "https://www.advocaterichadhanda.com",
    siteName: "Advocate Richa Dhanda",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Advocate Richa Dhanda — Immigration Lawyer Kurukshetra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advocate Richa Dhanda — Immigration Lawyer | Kurukshetra",
    description:
      "Expert immigration legal representation. Visa, PR, citizenship & work permits in Kurukshetra, Haryana.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://www.advocaterichadhanda.com/#person",
                  name: "Advocate Richa Dhanda",
                  jobTitle: "Immigration Lawyer",
                  description:
                    "Expert Immigration Lawyer in Kurukshetra, Haryana. LL.M qualified with Bar Council registration PH/1260/2025. Specializes in visa applications, PR, citizenship and work permits.",
                  url: "https://www.advocaterichadhanda.com",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Kurukshetra",
                    addressRegion: "Haryana",
                    addressCountry: "IN",
                  },
                  telephone: "+91-XXXXXXXXXX",
                  alumniOf: {
                    "@type": "EducationalOrganization",
                    name: "LL.M (Immigration Law)",
                  },
                  knowsAbout: [
                    "Immigration Law",
                    "Visa Applications",
                    "Permanent Residency",
                    "Citizenship Applications",
                    "Work Permits",
                    "Business Visas",
                  ],
                  sameAs: ["https://www.advocaterichadhanda.com"],
                },
                {
                  "@type": "LegalService",
                  "@id": "https://www.advocaterichadhanda.com/#legalservice",
                  name: "Advocate Richa Dhanda — Immigration Law Services",
                  description:
                    "Expert immigration legal services in Kurukshetra, Haryana. Visa applications, PR, citizenship, work permits.",
                  url: "https://www.advocaterichadhanda.com",
                  logo: "https://www.advocaterichadhanda.com/og-image.jpg",
                  image: "https://www.advocaterichadhanda.com/og-image.jpg",
                  telephone: "+91-XXXXXXXXXX",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Kurukshetra",
                    addressRegion: "Haryana",
                    postalCode: "136118",
                    addressCountry: "IN",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: "29.9695",
                    longitude: "76.8783",
                  },
                  areaServed: [
                    { "@type": "Country", name: "India" },
                    { "@type": "City", name: "Kurukshetra" },
                    { "@type": "City", name: "Ambala" },
                    { "@type": "City", name: "Chandigarh" },
                  ],
                  serviceType: [
                    "Visa Application",
                    "Permanent Residency",
                    "Citizenship",
                    "Work Permit",
                    "Business Visa",
                    "Study Visa",
                  ],
                  openingHoursSpecification: [
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                      opens: "10:00",
                      closes: "18:00",
                    },
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: ["Saturday"],
                      opens: "10:00",
                      closes: "14:00",
                    },
                  ],
                  priceRange: "₹₹",
                  currenciesAccepted: "INR",
                  paymentAccepted: "Cash, UPI, Card",
                  hasMap: "https://maps.google.com/?q=Kurukshetra,Haryana",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.advocaterichadhanda.com/#website",
                  url: "https://www.advocaterichadhanda.com",
                  name: "Advocate Richa Dhanda",
                  description: "Expert Immigration Lawyer in Kurukshetra, Haryana",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://www.advocaterichadhanda.com/?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-cream text-charcoal`}>
        {children}
      </body>
    </html>
  );
}
