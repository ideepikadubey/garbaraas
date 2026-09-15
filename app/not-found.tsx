'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-maroon-950 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 rounded-full border-2 border-gold-400 bg-maroon-900 flex items-center justify-center font-serif font-black text-gold-400 text-xl mb-4">
        TFN
      </div>
      <h2 className="text-3xl font-serif font-bold text-cream-50">Page Not Found</h2>
      <p className="text-xs text-cream-300 mt-2 max-w-sm">
        The requested workshop page could not be found. Please return to the homepage.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2.5 rounded-xl bg-gold-500 text-maroon-950 font-bold text-xs hover:bg-gold-400 transition"
      >
        Return to Workshop Home
      </Link>
    </div>
  );
}
