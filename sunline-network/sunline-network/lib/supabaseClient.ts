import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ptioskvweufhixtlhwdh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0aW9za3Z3ZXVmaGl4dGxod2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMjQ3OTcsImV4cCI6MjA2ODYwMDc5N30.BVgkZ-Ou06kK3ApY_UjmaM8qZR5kztNgLyYXvWEUxNU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
