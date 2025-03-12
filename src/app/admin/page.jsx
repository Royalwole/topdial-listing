import React from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';

const AdminPage = () => {
  const { isSignedIn, user } = useAuth();
  const router = useRouter();

  // Redirect if the user is not signed in
  React.useEffect(() => {
    if (!isSignedIn) {
      router.push('/'); // Redirect to home if not authenticated
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to the Admin Page</h1>
      {isSignedIn && user && (
        <p className="mt-4">Hello, {user.firstName}!</p>
      )}
    </div>
  );
};

export default AdminPage;
