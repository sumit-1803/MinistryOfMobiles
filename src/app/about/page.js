import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata = {
  title: 'About Us | Ministry of Mobiles',
  description: 'Learn about Mohit Arora and the story behind Ministry of Mobiles, Delhi\'s trusted source for refurbished electronics.',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-700 py-24 sm:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-600 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About Us
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
            Delivering premium technology with trust and transparency since 2020.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Story
            </h2>
            <div className="mt-6 text-gray-500 space-y-6 text-lg">
              <p>
                Ministry of Mobiles was founded in 2020 by <strong>Mohit Arora</strong>, a tech enthusiast with a vision to revolutionize the refurbished electronics market in Delhi.
              </p>
              <p>
                "I noticed a gap in the market," says Mohit. "People wanted premium devices like iPhones and MacBooks, but the prices were often out of reach. On the other hand, the used market was full of uncertainty and lack of trust."
              </p>
              <p>
                That's where Ministry of Mobiles comes in. We bridge that gap by offering high-quality, rigorously tested pre-owned devices that look and feel like new, but at a fraction of the cost.
              </p>
              <p>
                Over the years, we have served thousands of happy customers, building a reputation for honesty, quality, and exceptional after-sales support.
              </p>
            </div>
            
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-2xl font-bold text-gray-900">Why Trust Us?</h3>
              <ul className="mt-4 space-y-4">
                {[
                  '30-point quality check for every device',
                  'Transparent pricing with no hidden costs',
                  'Genuine parts and accessories',
                  'Dedicated customer support team',
                  'Hassle-free warranty on all products'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-500">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/mohit-arora.png"
                alt="Mohit Arora at Ministry of Mobiles Store"
                width={800}
                height={1000}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="mt-8 bg-gray-50 rounded-2xl p-8">
              <h3 className="text-lg font-medium text-gray-900">Visit Our Store</h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">
                    B- 138, Gali No. 7, Block C,<br />
                    Kiran Garden, Nawada,<br />
                    New Delhi, 110059
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">+91 93105 20254</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">support@ministryofmobiles.com</span>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">
                    Mon - Sat: 10:00 AM - 8:00 PM<br />
                    Sunday: Closed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="bg-blue-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to find your next device?</span>
            <span className="block text-blue-600">Explore our collection today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Go to Catalog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
