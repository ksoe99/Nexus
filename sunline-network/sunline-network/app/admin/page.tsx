'use client';
import { useRouter } from 'next/navigation';
import { useUserRole } from '@/lib/useUserRole';
import { useEffect } from 'react';

export default function AdminPage() {
  const router = useRouter();
  const { role, loading } = useUserRole();

  useEffect(() => {
    if (!loading && role !== 'admin') {
      router.push('/');
    }
  }, [loading, role]);

  if (loading) return <p>Checking access...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome, admin.</p>
    </div>
  );
}
