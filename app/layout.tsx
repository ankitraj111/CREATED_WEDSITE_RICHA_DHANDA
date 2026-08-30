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
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
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
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["Person", "Attorney"],
                  "@id": "https://www.advocaterichadhanda.com/#person",
                  name: "Advocate Richa Dhanda",
                  alternateName: ["Richa Dhanda", "Adv. Richa Dhanda", "Dr. Richa Dhanda"],
                  jobTitle: "High Court Advocate & Immigration Lawyer",
                  description:
                    "Advocate Richa Dhanda (Bar Council Reg. PH/1260/2025) is an LL.M qualified High Court Advocate & Immigration Lawyer based in Kurukshetra, Haryana, India. Specializing in Work Visas, Student Visas, Permanent Residency (PR), Refusal Appeals, and Citizenship across Canada, UK, Australia, USA, and Europe.",
                  url: "https://www.advocaterichadhanda.com",
                  image: "https://www.advocaterichadhanda.com/advocate-richa-photo.jpg",
                  email: "Advocatericha29@gmail.com",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Kurukshetra",
                    addressRegion: "Haryana",
                    postalCode: "136118",
                    addressCountry: "IN",
                  },
                  alumniOf: {
                    "@type": "EducationalOrganization",
                    name: "LL.M (Master of Laws in Immigration & Legal Studies)",
                  },
                  hasCredential: [
                    {
                      "@type": "EducationalOccupationalCredential",
                      credentialCategory: "degree",
                      name: "LL.M Degree",
                    },
                    {
                      "@type": "EducationalOccupationalCredential",
                      credentialCategory: "license",
                      name: "Bar Council Registration PH/1260/2025",
                    },
                  ],
                  knowsAbout: [
                    "Immigration Law",
                    "Visa Applications",
                    "Permanent Residency",
                    "Visa Refusal Appeals",
                    "Work Permits & LMIA",
                    "Student Visas",
                    "Citizenship & OCI",
                    "Business & Investor Visas",
                  ],
                  sameAs: [
                    "https://www.advocaterichadhanda.com",
                    "https://www.linkedin.com/in/dr-richa-dhanda-61a63994",
                    "https://www.instagram.com/txinctic",
                    "https://www.outlookindia.com",
                  ],
                },
                {
                  "@type": ["LegalService", "Attorney"],
                  "@id": "https://www.advocaterichadhanda.com/#legalservice",
                  name: "Advocate Richa Dhanda — Immigration Law Practice",
                  description:
                    "Professional legal representation for international immigration, work permits, study visas, permanent residency, and visa refusal appeals.",
                  url: "https://www.advocaterichadhanda.com",
                  logo: "https://www.advocaterichadhanda.com/favicon.svg",
                  image: "https://www.advocaterichadhanda.com/advocate-richa-photo.jpg",
                  email: "Advocatericha29@gmail.com",
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
                    { "@type": "Country", name: "Canada" },
                    { "@type": "Country", name: "United Kingdom" },
                    { "@type": "Country", name: "Australia" },
                    { "@type": "Country", name: "United States" },
                    { "@type": "City", name: "Kurukshetra" },
                    { "@type": "City", name: "Chandigarh" },
                    { "@type": "City", name: "Ambala" },
                    { "@type": "City", name: "Delhi NCR" },
                  ],
                  serviceType: [
                    "Work Visa Assistance",
                    "Student Visa & Study Permits",
                    "Permanent Residency (PR)",
                    "Visa Refusal & Appeals",
                    "Family Sponsorship",
                    "Business & Investor Visas",
                    "Citizenship & OCI Cards",
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
                  paymentAccepted: "UPI, Card, Net Banking",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.advocaterichadhanda.com/#website",
                  url: "https://www.advocaterichadhanda.com",
                  name: "Advocate Richa Dhanda",
                  description: "Official Website of Advocate Richa Dhanda — Expert Immigration Lawyer in Kurukshetra, Haryana",
                  publisher: {
                    "@id": "https://www.advocaterichadhanda.com/#person",
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
