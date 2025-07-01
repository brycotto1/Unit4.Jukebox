//table for the playlists
import db from "#db/client";

export const createPlaylist = async (name, desc) => {
  const sql = `
    INSERT INTO playlists (name, description)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const {rows: [playlist]} = await db.query(sql, [name, desc]);
  return playlist;
}

export const getPlaylists = async () => {
  const sql =`
    SELECT *
    FROM playlists;
  `;

  const {rows: tracks } = await db.query(sql);
  return tracks;
}

export const getPlaylistByID = async (id) => {
  const sql =`
    SELECT *
    FROM playlists
    WHERE id = $1;
  `;

  const {rows: [playlist] } = await db.query(sql, [id]);
  return playlist;
}