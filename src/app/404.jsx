import React from 'react';

const Custom404 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">
        Oops! The page you are looking for does not exist. 
        Please check the URL or return to the <a href="/" className="text-blue-500 hover:underline">homepage</a>.
      </p>
    </div>
  );
};

export default Custom404;
