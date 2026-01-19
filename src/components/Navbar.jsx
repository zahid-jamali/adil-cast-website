"use client";

import { useState } from "react";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/assets/Logo.png"
              alt="Logo"
              width={150}
              height={150}
              className="cursor-pointer"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className=" hover:text-accent">
              Home
            </Link>
            <Link href="/profile" className=" hover:text-accent">
              Profile
            </Link>
            <a href="#" className=" hover:text-accent">
              Upcoming Shows
            </a>
            <a href="#" className=" hover:text-accent">
              Podcasts
            </a>
            <a href="#" className=" hover:text-accent">
              Stories
            </a>
          </div>

          {/* Right Side Stuff */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-white hover:text-primary transition">
              Reach to us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isOpen ? (
                <HiX className="w-6 h-6 text-gray-700" />
              ) : (
                <HiMenu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link
            href="/"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Home
          </Link>
          <Link
            href="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Profile
          </Link>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Upcoming Shoes
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Podcast
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Stories
          </a>
          <div className="flex flex-col px-4 py-2 space-y-2">
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Contactus
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
