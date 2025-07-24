'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/admin/login', { method: 'POST', body: JSON.stringify({ user, pass }) })
      .then(res => res.json())
      .then(data => {
        if (data.success) router.push('/admin');
        else setError(data.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 p-6 border rounded">
      <h1 className="text-2xl mb-4">Admin Login</h1>
      {error && <p className="text-red-600">{error}</p>}
      <input type="text" value={user} onChange={e => setUser(e.target.value)} placeholder="Username" className="mb-2 w-full p-2 border" />
      <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" className="mb-2 w-full p-2 border" />
      <button type="submit" className="w-full bg-blue-600 text-white p-2">Login</button>
    </form>
  );
}
