'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Programmes',
    href: '/programmes',
    dropdown: [
      { name: "Children's Classes", href: '/programmes/childrens-classes' },
      { name: 'Junior Youth Groups', href: '/programmes/junior-youth-groups' },
      { name: 'Community Leaders Programme', href: '/programmes/community-leaders' },
      { name: 'Camps', href: '/programmes/camps' },
      { name: 'Devotional Gatherings', href: '/programmes/devotional-gatherings' },
    ],
  },
  { name: 'About', href: '/about' },
  { name: 'Camp Registration', href: 'https://bahaievents.org.uk', external: true },
  { name: 'Calendar', href: '/calendar' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [programmeDropdownOpen, setProgrammeDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProgrammeDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Woodberry Down Community
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div ref={dropdownRef}>
                    <button
                      onClick={() => setProgrammeDropdownOpen(!programmeDropdownOpen)}
                      className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {programmeDropdownOpen && (
                      <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg ring-1 ring-black ring-opacity-5 rounded-md z-50">
                        <div className="py-1">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                              onClick={() => setProgrammeDropdownOpen(false)}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                    {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => setProgrammeDropdownOpen(!programmeDropdownOpen)}
                        className="flex w-full items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      {programmeDropdownOpen && (
                        <div className="ml-4 space-y-1">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                              onClick={() => {
                                setMobileMenuOpen(false)
                                setProgrammeDropdownOpen(false)
                              }}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                      {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
