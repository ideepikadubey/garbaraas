import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Garba Raas Dandiya Mahotsav | Namo Club Kishangarh & TFN',
  description: "Namo Club Kishangarh Presents, Co Powered By The Frozen Night Event and Entertainment: Garba Raas Dandiya Mahotsav 2026. Book your slot online.",
  keywords: 'Garba Raas Dandiya Mahotsav, Namo Club Kishangarh, TFN The Frozen Night, Garba classes Kishangarh, Dandiya workshop Kishangarh, Manish Neel sir garba',
  openGraph: {
    title: 'Garba Raas Dandiya Mahotsav | Namo Club Kishangarh & TFN',
    description: "Namo Club Kishangarh Presents, Co Powered By The Frozen Night Event and Entertainment: Garba Raas Dandiya Mahotsav 2026. Book your slot online.",
    type: 'website',
    locale: 'en_IN',
  },
};

export const viewport: Viewport = {
  themeColor: '#ec4899',
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
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@600;700;800;900&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Mukta:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700;1,800&family=Rozha+One&family=Yatra+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-slate-900 min-h-screen selection:bg-pink-100 selection:text-pink-950 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
