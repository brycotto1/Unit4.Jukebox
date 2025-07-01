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
