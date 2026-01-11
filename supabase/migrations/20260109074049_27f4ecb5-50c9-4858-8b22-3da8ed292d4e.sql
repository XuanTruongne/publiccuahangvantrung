-- Rename posts table to blogs
ALTER TABLE public.posts RENAME TO blogs;

-- Update RLS policy name for clarity
ALTER POLICY "Anyone can read published posts" ON public.blogs 
RENAME TO "Anyone can read published blogs";