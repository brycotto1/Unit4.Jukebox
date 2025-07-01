//junction table for the playlists and tracks tables
import db from "#db/client";

export const createPlaylistTrack = async (playlistId, trackId) => {
  const sql = `
    INSERT INTO playlists_tracks (playlist_id, track_id)
    VALUES ($1, $2)
    RETURNING *;
  `;

  console.log(`playlist:` + playlistId, `track:` + trackId);

  const {rows: [playlistTrack]} = await db.query(sql, [playlistId, trackId]);
  console.log(playlistTrack);
  return playlistTrack;
}