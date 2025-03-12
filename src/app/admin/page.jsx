'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the dashboard
    router.push('/admin/dashboard');
  }, [router]);

  return null; // No content to render, as we are redirecting
}
