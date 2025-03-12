'use client';

import { Suspense } from 'react';

export default function Custom404() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      </div>
    </Suspense>
  );
}
