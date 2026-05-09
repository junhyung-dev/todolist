-- Create the todos table
CREATE TABLE IF NOT EXISTS public.todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all public access (select, insert, update, delete)
CREATE POLICY "Allow anonymous read access" ON public.todos FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert access" ON public.todos FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update access" ON public.todos FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete access" ON public.todos FOR DELETE USING (true);
