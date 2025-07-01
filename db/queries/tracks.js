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

export const getTracks = async () => {
  const sql =`
    SELECT *
    FROM tracks;
  `;

  const {rows: tracks } = await db.query(sql);
  return tracks;
}

export const getTrackByID = async (id) => {
  const sql =`
    SELECT *
    FROM tracks
    WHERE id = $1;
  `;

  const {rows: [track] } = await db.query(sql, [id]);
  return track;
}