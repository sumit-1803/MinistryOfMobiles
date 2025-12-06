import { Phone, Mail, Instagram, Clock, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-100 tracking-wide uppercase">Contact Us</h2>
            <p className="mt-1 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Get in Touch
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-blue-100">
              Have questions about a product? Need help with an order? We're here to help.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          
          {/* Phone */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                  <p className="mt-1 text-gray-500">Call or WhatsApp us</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-lg font-semibold text-gray-900">+91 93105 20254</p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
                  <p className="mt-1 text-gray-500">Visit our store</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-lg font-semibold text-gray-900">Mon-Sun: 10:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="mt-1 text-gray-500">Send us a query</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-lg font-semibold text-gray-900">support@ministryofmobiles.com</p>
              </div>
            </div>
          </div>

          {/* Instagram */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <Instagram className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Instagram</h3>
                  <p className="mt-1 text-gray-500">Follow for updates</p>
                </div>
              </div>
              <div className="mt-4">
                <a href="https://www.instagram.com/ministry_ofmobiles/" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-600 hover:text-blue-500">
                  @ministry_ofmobiles
                </a>
              </div>
            </div>
          </div>

           {/* Location */}
           <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-2">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Store Location</h3>
                  <p className="mt-1 text-gray-500">Come say hi!</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-lg text-gray-900">
                  B- 138, Gali No. 7, Block C, Kiran Garden, <br/>
                  Nawada, New Delhi, Delhi, 110059
                </p>
                {/* Decorative Map Placeholder */}
                <div className="mt-4 h-48 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <span className="text-gray-500 font-medium z-10 flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        View on Google Maps
                    </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
