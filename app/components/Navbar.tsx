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
  const menuRef = useRef<HTMLDivElement>(null)

  const [showHamburger, setShowHamburger] = useState(false)
  const [hamburgerOpen, setHamburgerOpen] = useState(false)

  // Toggle hamburger visibility based on window width
  useEffect(() => {
    const handleResize = () => {
      setShowHamburger(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close hamburger on route change
  useEffect(() => {
    setHamburgerOpen(false)
  }, [pathname])

  // Close hamburger on outside click or ESC key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        hamburgerOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setHamburgerOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setHamburgerOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [hamburgerOpen])

  const navLinkClass = (href: string) => {
    const isRoot = href === '/'
    const isActive = isRoot ? pathname === '/' : pathname.startsWith(href)

    return `transition-colors duration-200 text-gray-300 hover:text-white ${
      isActive ? 'border-b-2 border-blue-500 pb-1 font-semibold text-white' : ''
    }`
  }

  return (
    <nav className="fixed top-0 z-20 flex w-full items-center justify-between bg-black bg-opacity-50 px-6 py-4 shadow-sm backdrop-blur-md">
      <div className="text-2xl font-bold text-white">Script Space</div>

      <div ref={menuRef} className="relative">
        {showHamburger ? (
          <>
            <button
              className="text-white"
              onClick={() => setHamburgerOpen((prev) => !prev)}
              aria-label="Toggle Menu"
            >
              <Menu />
            </button>

            {hamburgerOpen && (
              <ul className="animate-slide-fade absolute right-0 mt-3 flex w-40 flex-col gap-2 rounded-md bg-black bg-opacity-90 p-4 shadow-lg">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={navLinkClass(link.href)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <ul className="flex gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={navLinkClass(link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-fade {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-fade {
          animation: slide-fade 0.25s ease-out;
        }
      `}</style>
    </nav>
  )
}
