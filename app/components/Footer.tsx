'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-12 bg-gray-900 py-8 text-gray-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="text-center text-sm sm:text-left">
            &copy; {new Date().getFullYear()} Scripted Spaces. All rights
            reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <Link href="/templates" className="transition hover:text-white">
              Templates
            </Link>
            <Link href="/about" className="transition hover:text-white">
              About
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Contact
            </Link>
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
