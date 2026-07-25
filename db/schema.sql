-- Publications pipeline schema. Local build tool; the deployed site never
-- reads this. Applied idempotently at the start of every session -- the working
-- .db is a disposable byproduct of db/seed.sql, which is the committed source
-- of truth. Schema lives here and ONLY here; seed.sql carries data only.
--
-- Ported from the Supabase Postgres schema. Row-level security is intentionally
-- not carried over: there is no server and no roles, so the security property
-- is "a local file outside version control" rather than deny-by-default RLS
-- that only service_role ever bypassed.

CREATE TABLE IF NOT EXISTS publication_kinds (kind TEXT PRIMARY KEY);
INSERT OR IGNORE INTO publication_kinds (kind)
VALUES ('article'), ('published-abstract'), ('submitted');

CREATE TABLE IF NOT EXISTS publication_tags (tag TEXT PRIMARY KEY);
INSERT OR IGNORE INTO publication_tags (tag)
VALUES ('epidemiology'), ('informatics'), ('health-equity'), ('chemistry');

CREATE TABLE IF NOT EXISTS publications (
    id               TEXT PRIMARY KEY,
    title            TEXT NOT NULL,
    authors_raw      TEXT NOT NULL,
    journal          TEXT NOT NULL,
    year             INTEGER NOT NULL,
    doi              TEXT,
    pmid             TEXT,
    url              TEXT,
    kind             TEXT NOT NULL REFERENCES publication_kinds(kind),
    is_first_author  BOOLEAN NOT NULL DEFAULT 0,
    is_peer_reviewed BOOLEAN NOT NULL DEFAULT 0,
    doi_source       TEXT,
    metadata_locked  BOOLEAN NOT NULL DEFAULT 0,
    created_at       TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_parsed_at   TEXT
);

CREATE TABLE IF NOT EXISTS publication_tag_map (
    publication_id TEXT NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
    tag            TEXT NOT NULL REFERENCES publication_tags(tag),
    PRIMARY KEY (publication_id, tag)
);

-- Surrogate pk: the slug id is NOT unique (one study can appear as both an oral
-- and a poster at the same venue and year). A TEXT PRIMARY KEY on id silently
-- collapsed 43 parsed rows to 36. Ascending pk also preserves CV parse order,
-- which the byte-identical export relies on to break sort ties.
CREATE TABLE IF NOT EXISTS presentations (
    pk               INTEGER PRIMARY KEY AUTOINCREMENT,
    id               TEXT NOT NULL,
    title            TEXT NOT NULL,
    authors_raw      TEXT NOT NULL,
    venue            TEXT NOT NULL,
    location         TEXT,
    date             TEXT NOT NULL,
    year             INTEGER NOT NULL,
    type             TEXT NOT NULL CHECK (type IN ('oral', 'poster')),
    status           TEXT,
    is_first_author  BOOLEAN NOT NULL DEFAULT 0,
    metadata_locked  BOOLEAN NOT NULL DEFAULT 0,
    created_at       TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_parsed_at   TEXT
);

CREATE TABLE IF NOT EXISTS enrichment_log (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    publication_id TEXT NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
    source         TEXT NOT NULL,
    field_name     TEXT NOT NULL,
    old_value      TEXT,
    new_value      TEXT,
    confidence     REAL,
    created_at     TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_publications_year  ON publications(year DESC);
CREATE INDEX IF NOT EXISTS idx_publications_kind  ON publications(kind);
CREATE INDEX IF NOT EXISTS idx_pub_tag_map_tag    ON publication_tag_map(tag);
CREATE INDEX IF NOT EXISTS idx_presentations_year ON presentations(year DESC);
CREATE INDEX IF NOT EXISTS idx_presentations_id   ON presentations(id);
