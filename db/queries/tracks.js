//table for the tracks
import db from "#db/client";

export const createTrack = async (name, duration) => {
  const sql = `
    INSERT INTO tracks (name, duration_ms)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const {rows: [track]} = await db.query(sql, [name, duration]);
  return track;
}