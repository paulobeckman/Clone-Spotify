CREATE TABLE "playlists" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "description" text
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text,
  "playlist_id" int UNIQUE
);

ALTER TABLE "files" ADD FOREIGN KEY ("playlist_id") REFERENCES "playlists" ("id");
