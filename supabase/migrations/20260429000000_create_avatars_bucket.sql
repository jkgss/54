-- Create the avatars bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', false)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 1. Users can upload their own avatar
CREATE POLICY "Users can upload their own avatar" 
ON storage.objects FOR INSERT TO authenticated 
WITH CHECK (bucket_id = 'avatars' AND owner = auth.uid() OR owner::text = auth.uid()::text);

-- 2. Users can update their own avatar
CREATE POLICY "Users can update their own avatar" 
ON storage.objects FOR UPDATE TO authenticated 
USING (bucket_id = 'avatars' AND owner = auth.uid() OR owner::text = auth.uid()::text)
WITH CHECK (bucket_id = 'avatars' AND owner = auth.uid() OR owner::text = auth.uid()::text);

-- 3. Users can view their own avatar
CREATE POLICY "Users can view own avatar" 
ON storage.objects FOR SELECT TO authenticated 
USING (bucket_id = 'avatars' AND (owner = auth.uid() OR owner::text = auth.uid()::text));

-- 4. Admins can view all avatars
CREATE POLICY "Admins can view all avatars" 
ON storage.objects FOR SELECT TO authenticated 
USING (
  bucket_id = 'avatars' AND 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 5. Users can delete their own avatar
CREATE POLICY "Users can delete own avatar" 
ON storage.objects FOR DELETE TO authenticated 
USING (bucket_id = 'avatars' AND owner = auth.uid() OR owner::text = auth.uid()::text);
