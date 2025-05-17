"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/templates", label: "Templates" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed w-full z-20 flex items-center justify-between p-6 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="text-white text-xl font-bold">ScriptedSpaces</div>

      <ul className="flex gap-8">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-gray-300 hover:text-white transition-colors duration-200 ${
                  isActive
                    ? "border-b-2 border-blue-500 pb-1 text-white font-semibold"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
