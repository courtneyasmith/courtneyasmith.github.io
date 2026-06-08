-- Grant the local pipeline's service_role full CRUD on the pipeline tables.
-- Newer Supabase projects do not auto-grant table privileges to service_role on
-- tables created via raw-SQL migrations, so the Data API returns 42501
-- (permission denied) until these grants exist. service_role bypasses RLS, so
-- once granted it can read/write while anon/authenticated stay denied-by-default
-- (they are deliberately granted nothing here).

GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- Future tables/sequences in this schema inherit the same service_role grant.
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;
