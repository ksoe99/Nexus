'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AdminDashboard() {
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [domain, setDomain] = useState('sunline');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/admin/check')
      .then(res => {
        if (res.status !== 200) router.push('/admin/login');
        else setVerified(true);
      });
  }, []);

  const handleSubmit = async () => {
    const { error } = await supabase.from('articles').insert({
      title,
      content,
      domain,
      published: true,
      created_at: new Date(),
    });
    setStatus(error ? `Error: ${error.message}` : 'Article posted!');
    if (!error) {
      setTitle('');
      setContent('');
    }
  };

  if (!verified) return <p>Checking login...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Post New Article</h1>
      <input className="border p-2 w-full mb-3" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea className="border p-2 w-full mb-3" value={content} onChange={e => setContent(e.target.value)} rows={6} placeholder="Content" />
      <select className="border p-2 w-full mb-3" value={domain} onChange={e => setDomain(e.target.value)}>
        <option value="sunline">Sunline News</option>
        <option value="tech">Sunline Tech</option>
        <option value="politics">Sunline Politics</option>
        <option value="world">Sunline World</option>
        <option value="green">Sunline Green</option>
      </select>
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2">Post</button>
      {status && <p className="mt-3 text-sm">{status}</p>}
    </div>
  );
}
