import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">About Us</h2>
          <p className="text-sm">We provide the best property listings for your needs.</p>
        </div>
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Newsletter</h2>
          <form className="flex">
            <input type="email" placeholder="Your email" className="p-2 rounded-l" />
            <button type="submit" className="bg-red-600 text-white p-2 rounded-r">Subscribe</button>
          </form>
        </div>
        <p className="mt-4 text-center">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
