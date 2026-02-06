-- Allow anyone (including anonymous users) to submit feedback/testimonials
CREATE POLICY "Anyone can submit testimonials"
ON public.testimonials FOR INSERT
TO anon, authenticated
WITH CHECK (true);
