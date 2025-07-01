import express from "express";
const app = express();
export default app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the jukebox!");
});

import { tracksRouter } from "#api/tracks";
app.use("/tracks", tracksRouter);

import { playlistsRouter } from "#api/playlists";
app.use("/playlists", playlistsRouter);

app.use((err, req, res, next) => {
  if(err.code === "23505") return res.status(400).send(err.detail);
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});