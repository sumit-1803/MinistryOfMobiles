'use client';

import { useActionState, useState, useEffect } from 'react';
import { sendLoginOTP, verifyLoginOTP } from '@/app/actions/customerAuth';
import { useFormStatus } from 'react-dom';

function SubmitButton({ text, loadingText }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
    >
      {pending ? loadingText : text}
    </button>
  );
}

export default function CustomerLogin() {
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [email, setEmail] = useState('');
  
  const [sendState, sendAction] = useActionState(sendLoginOTP, null);
  const [verifyState, verifyAction] = useActionState(verifyLoginOTP, null);

  useEffect(() => {
    if (sendState?.success) {
      setStep('otp');
      if (sendState.email) setEmail(sendState.email);
    }
  }, [sendState]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <a href="/catalog" className="font-medium text-blue-600 hover:text-blue-500">
            browse products
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 'email' ? (
            <form action={sendAction} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              {sendState?.message && !sendState.success && (
                <div className="text-red-600 text-sm">{sendState.message}</div>
              )}

              <div className="text-sm text-gray-500 text-center">
                <p>Note: Please check your spam folder if you don't see the email.</p>
              </div>

              <div>
                <SubmitButton text="Send OTP" loadingText="Sending..." />
              </div>
            </form>
          ) : (
            <form action={verifyAction} className="space-y-6">
              <input type="hidden" name="email" value={email} />
              
              <div>
                <div className="flex justify-between">
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    Enter OTP sent to {email}
                    </label>
                    <button 
                        type="button" 
                        onClick={() => setStep('email')}
                        className="text-sm text-blue-600 hover:text-blue-500"
                    >
                        Change Email
                    </button>
                </div>
                <div className="mt-1">
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm tracking-widest text-center text-2xl"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>
              </div>

              {verifyState?.message && !verifyState.success && (
                <div className="text-red-600 text-sm">{verifyState.message}</div>
              )}

              <div>
                <SubmitButton text="Verify & Login" loadingText="Verifying..." />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
