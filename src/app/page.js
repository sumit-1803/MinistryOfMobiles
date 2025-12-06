import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Customer from '@/models/Customer';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Smartphone, Tablet, Laptop, Headphones, CheckCircle, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { getSession } from '@/lib/auth';

import ProductRow from '@/components/ProductRow';
import AboutSection from '@/components/AboutSection';
import FadeIn from '@/components/animations/FadeIn';

export const dynamic = 'force-dynamic';

export default async function Home() {
  await dbConnect();
  
  const sanitizeProduct = (product) => ({
    ...product,
    _id: product._id.toString(),
    createdAt: product.createdAt?.toISOString(),
    updatedAt: product.updatedAt?.toISOString(),
  });

  // Fetch latest products
  const latestProductsRaw = await Product.find({ isAvailable: true })
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();
  const latestProducts = latestProductsRaw.map(sanitizeProduct);

  // Fetch Laptops (MacBooks)
  const laptopsRaw = await Product.find({ 
    isAvailable: true, 
    category: { $in: ['macbook', 'laptop'] } 
  }).sort({ createdAt: -1 }).limit(4).lean();
  const laptops = laptopsRaw.map(sanitizeProduct);

  // Fetch Watches
  const watchesRaw = await Product.find({ 
    isAvailable: true, 
    category: 'watch' 
  }).sort({ createdAt: -1 }).limit(4).lean();
  const watches = watchesRaw.map(sanitizeProduct);

  // Fetch iPads
  const ipadsRaw = await Product.find({ 
    isAvailable: true, 
    category: { $in: ['ipad', 'tablet'] } 
  }).sort({ createdAt: -1 }).limit(4).lean();
  const ipads = ipadsRaw.map(sanitizeProduct);

  const session = await getSession();
  let wishlist = [];
  if (session && session.user) {
    const customer = await Customer.findOne({ email: session.user.email });
    if (customer && customer.wishlist) {
      wishlist = customer.wishlist.map(id => id.toString());
    }
  }

  const categories = [
    { name: 'Phones', icon: Smartphone, href: '/catalog?category=phone' },
    { name: 'Tablets', icon: Tablet, href: '/catalog?category=tablet' },
    { name: 'MacBooks', icon: Laptop, href: '/catalog?category=macbook' },
    { name: 'Accessories', icon: Headphones, href: '/catalog?category=accessories' },
  ];

  const features = [
    {
      name: 'Quality Guaranteed',
      description: 'Every device undergoes a rigorous 30-point quality check.',
      icon: CheckCircle,
    },
    {
      name: 'Best Prices',
      description: 'Premium tech at unbeatable second-hand market prices.',
      icon: ShieldCheck,
    },
    {
      name: 'Expert Support',
      description: 'Our team is here to help you find the perfect device.',
      icon: Truck,
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <FadeIn direction="right">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Premium Second-Hand</span>{' '}
                    <span className="block text-blue-600 xl:inline">Electronics</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Delhi's most trusted store for pre-owned iPhones, MacBooks, and iPads. 
                    Experience premium tech without the premium price tag.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link
                        href="/catalog"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg"
                      >
                        Shop Now
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link
                        href="/contact"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg"
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1761581327147-624debe5a874?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Electronics Store"
          />
        </div>
      </div>

      {/* Shop by Category */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Browse</h2>
            <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight">
              Shop by Category
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:gap-8">
            {categories.map((category) => (
              <Link key={category.name} href={category.href} className="group">
                <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                  <category.icon className="h-10 w-10 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
                  <span className="mt-4 text-sm font-medium text-gray-900">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Arrivals */}
      <FadeIn>
        <ProductRow 
          title="Latest Arrivals" 
          products={latestProducts} 
          viewAllLink="/catalog?sort=newest" 
          wishlist={wishlist}
        />
      </FadeIn>

      {/* Laptops Section */}
      <FadeIn delay={0.1}>
        <ProductRow 
          title="Refurbished Laptops" 
          products={laptops} 
          viewAllLink="/catalog?category=macbook" 
          wishlist={wishlist}
        />
      </FadeIn>

      {/* Watches Section */}
      <FadeIn delay={0.2}>
        <ProductRow 
          title="Watches" 
          products={watches} 
          viewAllLink="/catalog?category=watch" 
          wishlist={wishlist}
        />
      </FadeIn>

      {/* iPads Section */}
      <FadeIn delay={0.3}>
        <ProductRow 
          title="iPads & Tablets" 
          products={ipads} 
          viewAllLink="/catalog?category=ipad" 
          wishlist={wishlist}
        />
      </FadeIn>

      {/* About Section */}
      <AboutSection />

      {/* Why Choose Us */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white">Why Choose Ministry of Mobiles?</h2>
            <p className="mt-4 text-lg text-blue-200">
              We are committed to providing the best second-hand electronics experience in Delhi.
            </p>
          </div>
          <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-white">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-blue-200">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to upgrade?</span>
            <span className="block text-blue-600">Browse our catalog today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
