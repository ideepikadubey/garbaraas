import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Garba & Dandiya Classes in Kishangarh | TFN – The Frozen Night',
  description: "Join TFN's one-month Garba & Dandiya workshop in Kishangarh. Choose your batch, book your slot and register online.",
  keywords: 'Garba classes Kishangarh, Dandiya workshop Kishangarh, TFN The Frozen Night, Navratri dance Kishangarh, Manish Neel sir garba',
  openGraph: {
    title: 'Garba & Dandiya Classes in Kishangarh | TFN – The Frozen Night',
    description: "Join TFN's one-month Garba & Dandiya workshop in Kishangarh. Choose your batch, book your slot and register online.",
    type: 'website',
    locale: 'en_IN',
  },
};

export const viewport: Viewport = {
  themeColor: '#22060c',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@600;700;800;900&family=Mukta:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700;1,800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Rozha+One&family=Yatra+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-[#1a080e] min-h-screen selection:bg-pink-100 selection:text-pink-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
