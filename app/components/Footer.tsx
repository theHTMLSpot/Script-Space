"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} Scripted Spaces. All rights
            reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <Link href="/templates" className="hover:text-white transition">
              Templates
            </Link>
            <Link href="/about" className="hover:text-white transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

