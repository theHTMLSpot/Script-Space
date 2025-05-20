'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu } from 'lucide-react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/templates', label: 'Templates' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()

  const [showingHamburger, setShowingHamburger] = useState(false)
  const [hamburgerOpen, setHamburgerOpen] = useState(false)

  const menuRef = useRef(null)

  // ✅ Resize listener to show/hide hamburger icon
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowingHamburger(true)
      } else {
        setShowingHamburger(false)
      }
    }

    handleResize() // run once on mount

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ✅ Close hamburger menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        hamburgerOpen &&
        menuRef.current &&
        !(menuRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setHamburgerOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [hamburgerOpen])

  // ✅ Close menu on route change
  useEffect(() => {
    setHamburgerOpen(false)
  }, [pathname])

  return (
    <nav className="fixed z-20 flex w-full items-center justify-between bg-black bg-opacity-50 p-6 backdrop-blur-sm">
      <div className="text-xl font-bold text-white">Script Space</div>

      <div className="relative" ref={menuRef}>
        {showingHamburger && (
          <button
            className="text-white"
            onClick={() => setHamburgerOpen(!hamburgerOpen)}
            onMouseEnter={() => setHamburgerOpen(true)}
          >
            <Menu />
          </button>
        )}

        {hamburgerOpen && (
          <ul className="top-15 absolute right-5 flex flex-col gap-2 rounded bg-black bg-opacity-90 p-4">
            {links.map((link) => {
              const isActive = pathname === link.href

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-gray-300 transition-colors duration-200 hover:text-white ${
                      isActive
                        ? 'border-b-2 border-blue-500 pb-1 font-semibold text-white'
                        : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}

        {!showingHamburger && (
          <ul className="flex gap-8">
            {links.map((link) => {
              const isActive = pathname === link.href

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-gray-300 transition-colors duration-200 hover:text-white ${
                      isActive
                        ? 'border-b-2 border-blue-500 pb-1 font-semibold text-white'
                        : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </nav>
  )
}
