'use client';

import { FaSearch } from 'react-icons/fa';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

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
    <header className="bg-slate-200 shadow-md relative">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link href="/" onClick={() => setIsMenuOpen(false)}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500 mr-1">Topdial</span>
            <span className="text-slate-700">Services</span>
          </h1>
        </Link>
        
        <form
          className="bg-slate-100 p-3 rounded-lg flex items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-slate-700 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navigation Menu */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="flex flex-col md:flex-row gap-4 items-center px-4 md:px-0">
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
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <li>
                <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                  <span className="text-slate-700 hover:underline">Sign In</span>
                </Link>
              </li>
            </SignedOut>
          </ul>
        </nav>
      </div>
    </header>
  );
}
