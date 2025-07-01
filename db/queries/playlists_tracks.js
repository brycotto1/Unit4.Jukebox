//junction table for the playlists and tracks tables
import db from "#db/client";

export const createPlaylistTrack = async (playlistId, trackId) => {
  const sql = `
    INSERT INTO playlists_tracks (playlist_id, track_id)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const {rows: [playlistTrack]} = await db.query(sql, [playlistId, trackId]);
  return playlistTrack;
}

export const getTracksByPlaylistID = async (playlistId) => {
  const sql = `
    SELECT * FROM tracks
    JOIN playlists_tracks on tracks.id = playlists_tracks.track_id
    JOIN playlists on playlists.id = playlists_tracks.playlist_id
    WHERE playlists.id = $1;
  `;

  const {rows: tracks} = await db.query(sql, [playlistId]);
  return tracks;
}