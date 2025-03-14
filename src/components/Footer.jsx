import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">About Us</h2>
            <p className="text-sm">We provide the best property listings for your needs.</p>
          </div>
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <ul className="text-sm space-y-1">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Newsletter</h2>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="p-2 rounded-l bg-white text-black flex-1"
              />
              <button
                type="submit"
                className="bg-red-600 text-white p-2 rounded-r hover:bg-red-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <p className="text-center text-sm">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;