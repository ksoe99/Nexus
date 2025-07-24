'use client';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRole = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      console.log('User fetch result:', user);
      if (!user || userError) {
        console.error('User fetch error:', userError);
        setRole(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      console.log('Profile fetch result:', data);
      if (error) {
        console.error('Profile fetch error:', error.message);
      }

      if (data?.role) setRole(data.role);
      setLoading(false);
    };

    getRole();
  }, []);

  return { role, loading };
}
