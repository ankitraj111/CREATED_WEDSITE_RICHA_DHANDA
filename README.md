# Advocate Richa Dhanda - Official Website
Last Updated: 2026-08-19 (Email Resend Integration Active)

A modern, professional Next.js website for immigration law advocate services.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Fonts:** Google Fonts (Inter + Playfair Display)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Responsive design optimized for all devices
- Professional hero section with image and stats
- Client testimonials carousel
- FAQ accordion section
- Contact form with validation
- Floating WhatsApp button
- Cookie consent banner
- Smooth animations and transitions
- SEO optimized with metadata
- Accessible components

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with fonts & metadata
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles & Tailwind
├── components/
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section
│   ├── WhyChoose.tsx    # Stats and features
│   ├── CTABanner.tsx    # Call-to-action banner
│   ├── Testimonials.tsx # Client testimonials carousel
│   ├── FAQTeaser.tsx    # FAQ accordion
│   ├── ContactForm.tsx  # Contact form
│   ├── Footer.tsx       # Footer section
│   ├── FloatingWhatsApp.tsx # WhatsApp floating button
│   └── CookieBanner.tsx # Cookie consent
└── tailwind.config.ts   # Tailwind configuration

```

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color palette:
- Navy: #0f1e3d
- Maroon: #6b1d2a
- Gold: #c9a227
- Cream: #f7f1e1

### Contact Information
Update these files:
- `components/CTABanner.tsx` - WhatsApp number
- `components/FloatingWhatsApp.tsx` - WhatsApp number
- `components/ContactForm.tsx` - Contact details
- `components/Footer.tsx` - Office address, phone, email

### Form Submission
The contact form currently displays a success message. To connect to a backend:
1. Create an API route in `app/api/contact/route.ts`
2. Update the `handleSubmit` function in `components/ContactForm.tsx`

Example services: Formspree, EmailJS, or custom API

## Build for Production

```bash
npm run build
npm start
```

## License

© 2025 Advocate Richa Dhanda. All rights reserved.
