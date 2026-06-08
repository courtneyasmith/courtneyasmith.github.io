-- Publications pipeline schema: curated intermediate layer between CV and site.
-- The DB is a local build tool; only the service_role connects (it bypasses RLS).
-- RLS is enabled with no anon/authenticated policies => deny-by-default.

-- Controlled vocabularies
CREATE TABLE publication_kinds (kind TEXT PRIMARY KEY);
INSERT INTO publication_kinds VALUES ('article'),('published-abstract'),('submitted');

CREATE TABLE publication_tags (tag TEXT PRIMARY KEY);
INSERT INTO publication_tags VALUES ('epidemiology'),('informatics'),('health-equity'),('chemistry');

-- Publications
CREATE TABLE publications (
    id               TEXT PRIMARY KEY,
    title            TEXT NOT NULL,
    authors_raw      TEXT NOT NULL,
    journal          TEXT NOT NULL,
    year             SMALLINT NOT NULL,
    doi              TEXT,
    pmid             TEXT,
    url              TEXT,
    kind             TEXT NOT NULL REFERENCES publication_kinds(kind),
    is_first_author  BOOLEAN NOT NULL DEFAULT FALSE,
    is_peer_reviewed BOOLEAN NOT NULL DEFAULT FALSE,
    doi_source       TEXT,
    metadata_locked  BOOLEAN NOT NULL DEFAULT FALSE,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_parsed_at   TIMESTAMPTZ
);

CREATE TABLE publication_tag_map (
    publication_id TEXT NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
    tag            TEXT NOT NULL REFERENCES publication_tags(tag),
    PRIMARY KEY (publication_id, tag)
);

-- Presentations
CREATE TABLE presentations (
    id               TEXT PRIMARY KEY,
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

-- Enrichment audit trail
CREATE TABLE enrichment_log (
    id             BIGSERIAL PRIMARY KEY,
    publication_id TEXT NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
    source         TEXT NOT NULL,
    field_name     TEXT NOT NULL,
    old_value      TEXT,
    new_value      TEXT,
    confidence     REAL,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_publications_year   ON publications(year DESC);
CREATE INDEX idx_publications_kind   ON publications(kind);
CREATE INDEX idx_pub_tag_map_tag     ON publication_tag_map(tag);
CREATE INDEX idx_presentations_year  ON presentations(year DESC);

-- RLS: deny-by-default; only service_role (which bypasses RLS) connects locally.
ALTER TABLE publications        ENABLE ROW LEVEL SECURITY;
ALTER TABLE presentations       ENABLE ROW LEVEL SECURITY;
ALTER TABLE publication_tag_map ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrichment_log      ENABLE ROW LEVEL SECURITY;
ALTER TABLE publication_kinds   ENABLE ROW LEVEL SECURITY;
ALTER TABLE publication_tags    ENABLE ROW LEVEL SECURITY;
-- No CREATE POLICY for anon/authenticated => no public access.
