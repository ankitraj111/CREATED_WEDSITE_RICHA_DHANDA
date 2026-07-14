import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "Advocate Richa — Professional Legal Services | Kurukshetra",
  description: "Advocate Richa (Bar Council Reg. PH/1260/2025) — trusted legal advocate in Kurukshetra. Civil, Criminal, Family, Property law with LL.M expertise and personalized attention.",
  keywords: "advocate Kurukshetra, legal services, civil law, criminal law, family law, property disputes, Bar Council registered lawyer, LL.M advocate, Richa Dhanda",
  authors: [{ name: "Advocate Richa" }],
  openGraph: {
    title: "Advocate Richa — Professional Legal Services",
    description: "Expert legal representation with compassion and precision. LL.M qualified advocate serving Kurukshetra with comprehensive legal solutions.",
    type: "website",
    url: "https://advocatericha.com",
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
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-cream text-charcoal`}>
        {children}
      </body>
    </html>
  );
}
