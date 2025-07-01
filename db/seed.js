import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createPlaylist } from "./queries/playlists.js";
import { createTrack } from "./queries/tracks.js";
import { createPlaylistTrack } from "./queries/playlists_tracks.js";

const seed = async () => {
  const playlists = [];
  const tracks = [];

  for(let i = 0; i < 10; i++){
    playlists.push(await createPlaylist(
      faker.word.verb(), faker.commerce.productDescription()
    ));
  }
  
  for(let i = 0; i < 20; i++){
    tracks.push(await createTrack(
      faker.music.songName(), faker.number.int({min:15000, max:45000})
    ));
  }

  for(let i = 0; i < 15; i++){
    const {id: playlist} = playlists[Math.floor(Math.random() * playlists.length)];
    const {id: track} = tracks[Math.floor(Math.random() * tracks.length)];
    await createPlaylistTrack(playlist, track);
  }
}

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");
