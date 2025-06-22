import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Organization Info */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Woodberry Down Community</h3>
              <p className="text-gray-300 mb-4">
                Building community bonds through educational programmes, youth development, and
                interfaith activities in the heart of London.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <a
                    href="mailto:hackney.jyesep@gmail.com"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    hackney.jyesep@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <a
                    href="tel:07576502702"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    07576 502702
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">Woodberry Down, London N4, UK</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/programmes"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Our Programmes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/calendar"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Calendar
                  </Link>
                </li>
                <li>
                  <a
                    href="https://bahaievents.org.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Camp Registration
                  </a>
                </li>
              </ul>
            </div>

            {/* Programmes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Programmes</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/programmes/childrens-classes"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Children&apos;s Classes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/programmes/junior-youth-groups"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Junior Youth Groups
                  </Link>
                </li>
                <li>
                  <Link
                    href="/programmes/community-leaders"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Community Leaders
                  </Link>
                </li>
                <li>
                  <Link
                    href="/programmes/camps"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Camps
                  </Link>
                </li>
                <li>
                  <Link
                    href="/programmes/devotional-gatherings"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Devotional Gatherings
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Woodberry Down Community. All rights reserved.
              </div>

              {/* Social Media Links - Placeholder for future use */}
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
