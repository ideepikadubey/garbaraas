'use client';

import React, { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-maroon-950 flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-2xl font-serif font-bold text-cream-50">Something went wrong!</h2>
      <p className="text-xs text-red-300 mt-2">{error.message || 'An unexpected error occurred.'}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-6 py-2 rounded-xl bg-gold-500 text-maroon-950 font-bold text-xs hover:bg-gold-400 transition"
      >
        Try Again
      </button>
    </div>
  );
}
