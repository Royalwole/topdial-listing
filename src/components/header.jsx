'use client';

import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Header() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) return;
      try {
        const response = await fetch('/api/admin/check');
        setIsAdmin(response.ok);
      } catch (err) {
        console.error('Failed to check admin status:', err);
      }
    };
    checkAdmin();
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex flex-col sm:flex-row items-center max-w-6xl mx-auto p-3">
        {/* Logo and Hamburger */}
        <div className="flex justify-between w-full sm:w-auto">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-500 mr-1">Topdial</span>
              <span className="text-slate-700">Services</span>
            </h1>
          </Link>
          <button
            className="md:hidden text-slate-700 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Search Form */}
        <form
          className="bg-slate-100 p-3 rounded-lg flex items-center w-full sm:flex-1 sm:mx-4 mt-3 sm:mt-0"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        {/* Navigation */}
        <nav className="hidden sm:flex sm:items-center">
          <ul className="flex gap-4">
            <li>
              <Link href="/">
                <span className="text-slate-700 hover:underline">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <span className="text-slate-700 hover:underline">About</span>
              </Link>
            </li>
            <SignedIn>
              {isAdmin && (
                <li>
                  <Link href="/admin/dashboard">
                    <span className="text-slate-700 hover:underline">Admin</span>
                  </Link>
                </li>
              )}
              <UserButton afterSignOutCallback={() => router.push('/')} />
            </SignedIn>
            <SignedOut>
              <li>
                <Link href="/sign-in">
                  <span className="text-slate-700 hover:underline">Sign In</span>
                </Link>
              </li>
            </SignedOut>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          <div className="flex justify-end p-3">
            <button onClick={() => setIsMenuOpen(false)}>
              <FaTimes size={24} className="text-slate-700" />
            </button>
          </div>
          <ul className="flex flex-col gap-4 p-3">
            <li>
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <span className="text-slate-700 hover:underline">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                <span className="text-slate-700 hover:underline">About</span>
              </Link>
            </li>
            <SignedIn>
              {isAdmin && (
                <li>
                  <Link href="/admin/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <span className="text-slate-700 hover:underline">Admin</span>
                  </Link>
                </li>
              )}
              <li>
                <UserButton afterSignOutCallback={() => router.push('/')} />
              </li>
            </SignedIn>
            <SignedOut>
              <li>
                <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                  <span className="text-slate-700 hover:underline">Sign In</span>
                </Link>
              </li>
            </SignedOut>
          </ul>
        </div>
      )}
    </header>
  );
}