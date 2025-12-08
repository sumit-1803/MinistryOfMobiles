import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Award, Users } from 'lucide-react';

export default function AboutSection() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image Section */}
          <div className="relative mb-12 lg:mb-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/mohit-arora.png"
                alt="Mohit Arora - Founder of Ministry of Mobiles"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-bold text-lg">Mohit Arora</p>
                <p className="text-blue-200 text-sm">Founder & Owner</p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full -z-10 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-100 rounded-full -z-10 blur-xl"></div>
          </div>

          {/* Content Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wide">
                Since 2020
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
              Meet the Face Behind <br />
              <span className="text-blue-600">Ministry of Mobiles</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Hi, I&apos;m <strong>Mohit Arora</strong>. I started Ministry of Mobiles in 2020 with a simple mission: to make premium technology accessible to everyone in Delhi without the premium price tag.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              What began as a small passion project has grown into Delhi&apos;s most trusted destination for refurbished Apple devices. I personally oversee the quality of every device that enters our store, ensuring you get nothing but the best.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Quality First</h3>
                  <p className="mt-1 text-sm text-gray-500">Rigorous 30-point checks</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Happy Customers</h3>
                  <p className="mt-1 text-sm text-gray-500">1000+ satisfied clients</p>
                </div>
              </div>
            </div>

            <Link 
              href="/about" 
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
            >
              Read our full story 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
