import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="Ministry of Mobiles" width={64} height={64} className="h-16 w-auto rounded-full border-2 border-yellow-500" />
            </div>
            <p className="text-gray-400 text-base">
              Your trusted destination for premium second-hand electronics. Quality checked, affordable, and reliable.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/ministry_ofmobiles/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://www.youtube.com/@chiragbajaj9244" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500">
                <span className="sr-only">YouTube</span>
                <Youtube className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Shop</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/catalog?category=phone" className="text-base text-gray-400 hover:text-white">
                      Phones
                    </Link>
                  </li>
                  <li>
                    <Link href="/catalog?category=tablet" className="text-base text-gray-400 hover:text-white">
                      Tablets
                    </Link>
                  </li>
                  <li>
                    <Link href="/catalog?category=ipad" className="text-base text-gray-400 hover:text-white">
                      iPads
                    </Link>
                  </li>
                  <li>
                    <Link href="/catalog?category=macbook" className="text-base text-gray-400 hover:text-white">
                      MacBooks
                    </Link>
                  </li>
                  <li>
                    <Link href="/catalog?category=accessories" className="text-base text-gray-400 hover:text-white">
                      Accessories
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/contact" className="text-base text-gray-400 hover:text-white">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-white">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-white">
                      Shipping Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-white">
                      Returns
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Contact</h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-start">
                    <MapPin className="h-6 w-6 text-blue-500 flex-shrink-0 mr-3" />
                    <span className="text-base text-gray-400">
                      B- 138, Gali No. 7, Block C, Kiran Garden, Nawada, New Delhi, 110059
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-6 w-6 text-blue-500 flex-shrink-0 mr-3" />
                    <span className="text-base text-gray-400">+91 93105 20254</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-6 w-6 text-blue-500 flex-shrink-0 mr-3" />
                    <span className="text-base text-gray-400 break-all">support@ministryofmobiles.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} Ministry of Mobiles. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
