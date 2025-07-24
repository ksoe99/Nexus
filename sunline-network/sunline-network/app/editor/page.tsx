'use client';
import { useState, useEffect } from 'react';
import { useUserRole } from '@/lib/useUserRole';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function EditorPage() {
  const { role, loading } = useUserRole();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    console.log('Role check:', { loading, role });

  
  }, [loading, role]);

  const handleSubmit = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    const userId = userData?.user?.id;

    console.log('User:', userData?.user);
    if (!userId || userError) {
      console.error('Auth error:', userError);
      setStatus('User not authenticated');
      return;
    }

    console.log('Submitting article:', { title, content, published, author_id: userId });

    const { data, error } = await supabase.from('articles').insert({
      title,
      content,
      published,
      author_id: userId,
    });

    if (error) {
      console.error('Insert error:', error);
      setStatus(`Insert failed: ${error.message}`);
    } else {
      console.log('Insert success:', data);
      setStatus('Article posted successfully');
      setTitle('');
      setContent('');
      setPublished(false);
    }
  };

  if (loading) return <p>Verifying...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Post an Article</h1>
      <input
        className="border w-full p-2 mb-3"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border w-full p-2 mb-3"
        placeholder="Content"
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <label className="block mb-3">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />{' '}
        Publish now
      </label>
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
}
