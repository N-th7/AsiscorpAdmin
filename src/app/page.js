'use client';

import React, { useEffect, useState } from 'react';
import LoginTemplate from './components/templates/LoginTemplate';
import { useSearchParams } from "next/navigation";


export default function Login() {

  const searchParams = useSearchParams();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (searchParams.get("sessionExpired") === "true") {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return (
    
    <div className='relative flex flex-col items-center justify-center min-h-screen p-6'>
      {showMessage && (
        <div className="mb-4 w-full max-w-md rounded-lg bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 text-center">
          ⚠️ Tu sesión ha expirado. Por favor, inicia sesión nuevamente.
        </div>
      )}
      <LoginTemplate />
    </div>
  );
}