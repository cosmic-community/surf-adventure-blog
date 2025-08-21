'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Category } from '@/types';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <header className={`w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/90'}`}>
        <div className="container flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-surf-blue">
            Surf Adventure Blog
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <li>
                <Link href="/" className="text-gray-800 hover:text-surf-blue">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/travel-guides" className="text-green-600 hover:text-green-700">
                  Travel Guides
                </Link>
              </li>
              <li>
                <Link href="/surf-spots" className="text-surf-blue hover:text-blue-600">
                  Surf Spots
                </Link>
              </li>
              <li>
                <Link href="/surf-culture" className="text-purple-600 hover:text-purple-700">
                  Surf Culture
                </Link>
              </li>
              <li>
                <Link href="/gear-reviews" className="text-amber-600 hover:text-amber-700">
                  Gear Reviews
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative w-6 h-6">
              {/* Three lines transformed into X */}
              <span
                className={`hamburger-line absolute h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? 'top-3 rotate-45' : 'top-1 rotate-0'
                }`}
              ></span>
              <span
                className={`hamburger-line absolute h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100 top-3'
                }`}
              ></span>
              <span
                className={`hamburger-line absolute h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? 'top-3 -rotate-45' : 'top-5 rotate-0'
                }`}
              ></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu - Now positioned below header instead of overlay */}
      <MobileMenu isOpen={isMenuOpen} categories={categories} onClose={() => {
        setIsMenuOpen(false);
      }} />
    </div>
  );
}