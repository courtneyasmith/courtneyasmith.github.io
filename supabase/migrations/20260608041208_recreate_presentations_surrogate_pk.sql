-- Option A: presentations need a surrogate primary key.
-- The slug id derived from (title, venue, year) is NOT unique: 7 presentations
-- are the same study shown at the same venue/year, differing only by type
-- (oral vs poster) and date. A TEXT PRIMARY KEY on id silently collapsed those
-- duplicates (43 parsed -> only 36 stored). Recreate with an IDENTITY surrogate
-- PK and a non-unique slug column so all 43 rows persist. sync_db full-refreshes
-- this table; the ascending pk preserves CV parse order, which the byte-identical
-- export relies on to break sort ties (e.g. an oral/poster pair of one study).
--
-- Safe to drop: no table references presentations (enrichment_log FKs
-- publications only). service_role CRUD is inherited from ALTER DEFAULT
-- PRIVILEGES (migration 20260608035708), so no new GRANT is needed.

DROP TABLE IF EXISTS presentations;

CREATE TABLE presentations (
    pk               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id               TEXT NOT NULL,             -- slug; NOT unique (duplicate studies)
    title            TEXT NOT NULL,
    authors_raw      TEXT NOT NULL,
    venue            TEXT NOT NULL,
    location         TEXT,
    date             TEXT NOT NULL,
    year             SMALLINT NOT NULL,
    type             TEXT NOT NULL CHECK (type IN ('oral','poster')),
    status           TEXT,
    is_first_author  BOOLEAN NOT NULL DEFAULT FALSE,
    metadata_locked  BOOLEAN NOT NULL DEFAULT FALSE,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_parsed_at   TIMESTAMPTZ
);

CREATE INDEX idx_presentations_year ON presentations(year DESC);
CREATE INDEX idx_presentations_id   ON presentations(id);

-- RLS: deny-by-default; only service_role (which bypasses RLS) connects locally.
ALTER TABLE presentations ENABLE ROW LEVEL SECURITY;
