'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { User, LogOut, ShieldCheck, Users, X } from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';

export default function UserMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return (
      <>
        <button
          onClick={() => setShowLoginModal(true)}
          className="text-gray-600 hover:text-gray-900 text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          Login
        </button>

        {showLoginModal && typeof document !== 'undefined' && createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-200">
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-500 mb-8">Choose your login method</p>
                
                <div className="space-y-4">
                  <Link
                    href="/login"
                    onClick={() => setShowLoginModal(false)}
                    className="group relative flex items-center p-4 border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                  >
                    <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="h-6 w-6" />
                    </div>
                    <div className="ml-4 text-left">
                      <h3 className="text-lg font-semibold text-gray-900">Customer Login</h3>
                      <p className="text-sm text-gray-500">Access your orders and profile</p>
                    </div>
                  </Link>

                  <Link
                    href="/admin/login"
                    onClick={() => setShowLoginModal(false)}
                    className="group relative flex items-center p-4 border-2 border-gray-100 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
                  >
                    <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div className="ml-4 text-left">
                      <h3 className="text-lg font-semibold text-gray-900">Admin Login</h3>
                      <p className="text-sm text-gray-500">Manage products and store</p>
                    </div>
                  </Link>
                </div>
              </div>
              
              <div className="bg-gray-50 px-8 py-4 text-center text-sm text-gray-500">
                New here? <Link href="/catalog" onClick={() => setShowLoginModal(false)} className="text-blue-600 font-medium hover:underline">Browse our catalog</Link>
              </div>
            </div>
          </div>,
          document.body
        )}
      </>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <User className="h-5 w-5" />
        <span className="hidden md:block text-sm font-medium">
          {user.name || user.email?.split('@')[0] || 'Account'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
          <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
            Signed in as <br />
            <span className="font-medium text-gray-900 truncate block">
              {user.email}
            </span>
          </div>
          
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Your Profile
          </Link>

          <button
            onClick={() => logoutAction()}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
