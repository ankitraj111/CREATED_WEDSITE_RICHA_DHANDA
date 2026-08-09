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
  title: "Advocate Richa — Expert Immigration Lawyer | Kurukshetra",
  description: "Advocate Richa (Bar Council Reg. PH/1260/2025) — Expert Immigration Lawyer in Kurukshetra. Visa applications, PR, citizenship with LL.M expertise and personalized legal solutions.",
  keywords: "immigration lawyer Kurukshetra, expert immigration advocate, visa lawyer, PR application, citizenship lawyer, immigration law expert, Bar Council registered immigration lawyer, LL.M immigration advocate, Richa Dhanda",
  authors: [{ name: "Advocate Richa" }],
  openGraph: {
    title: "Advocate Richa — Expert Immigration Lawyer",
    description: "Expert immigration legal representation with compassion and precision. LL.M qualified immigration advocate serving Kurukshetra with comprehensive immigration solutions.",
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
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-cream text-charcoal`}>
        {children}
        <Script 
          src="https://checkout.razorpay.com/v1/checkout.js" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}
