'use client';

import { logoutAction } from '@/app/actions/auth';
import { useFormStatus } from 'react-dom';
import { LogOut } from 'lucide-react';

function SubmitButton({ className }) {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${className} ${pending ? 'opacity-70 cursor-wait' : ''}`}
    >
      {pending ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Signing out...
        </span>
      ) : (
        <span className="flex items-center">
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </span>
      )}
    </button>
  );
}

export default function SignOutButton({ className }) {
  return (
    <form action={logoutAction} className="w-full">
      <SubmitButton className={className} />
    </form>
  );
}
