import { pgTable, serial, text, integer, boolean } from 'drizzle-orm/pg-core';

export const tracks = pgTable('tracks', {
  id: serial('id').primaryKey(),
  track_id: text('track_id'),
  artists: text('artists'),
  album_name: text('album_name'),
  track_name: text('track_name'),
  popularity: integer('popularity'),
  duration_ms: integer('duration_ms'),
  explicit: boolean('explicit'),
  danceability: text('danceability'),
  energy: text('energy'),
  key: integer('key'),
  loudness: text('loudness'),
  mode: integer('mode'),
  speechiness: text('speechiness'),
  acousticness: text('acousticness'),
  instrumentalness: text('instrumentalness'),
  liveness: text('liveness'),
  valence: text('valence'),
  tempo: text('tempo'),
  time_signature: integer('time_signature'),
  track_genre: text('track_genre')
});

export type SelectTrack = typeof tracks.$inferSelect;
export type InsertTrack = typeof tracks.$inferInsert;