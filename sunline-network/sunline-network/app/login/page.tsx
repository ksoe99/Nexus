'use client';
import { supabase } from '../../lib/supabaseClient';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (!error) setSubmitted(true);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {submitted ? (
        <p>Check your email for the login link.</p>
      ) : (
        <>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send Magic Link
          </button>
        </>
      )}
    </div>
  );
}
