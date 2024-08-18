import { db, closeConnection } from '../db/index.js';
import { tracks } from '../db/schema.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csvParser from 'csv-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function importData() {
  const results: any[] = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, './dataset.csv'))
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', resolve)
      .on('error', reject);
  });

  console.log(`Parsed ${results.length} rows from CSV`);

  for (let index = 0; index < results.length; index++) {
    const row = results[index];
    try {
      const newTrack = {
        track_id: row.track_id,
        artists: row.artists,
        album_name: row.album_name,
        track_name: row.track_name,
        popularity: parseInt(row.popularity),
        duration_ms: parseInt(row.duration_ms),
        explicit: row.explicit === 'true',
        danceability: row.danceability,
        energy: row.energy,
        key: parseInt(row.key),
        loudness: row.loudness,
        mode: parseInt(row.mode),
        speechiness: row.speechiness,
        acousticness: row.acousticness,
        instrumentalness: row.instrumentalness,
        liveness: row.liveness,
        valence: row.valence,
        tempo: row.tempo,
        time_signature: parseInt(row.time_signature),
        track_genre: row.track_genre
      };
      await db.insert(tracks).values(newTrack).execute();
      if (index % 1000 === 0) {
        console.log(`Inserted ${index} rows`);
      }
    } catch (error) {
      console.error(`Error inserting row ${index}:`, error);
      console.error('Row data:', row);
    }
  }
  console.log('Data import completed');
}

async function main() {
  try {
    await importData();
  } catch (error) {
    console.error('An error occurred during import:', error);
  } finally {
    await closeConnection();
  }
}

main().catch(console.error);