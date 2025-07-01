import { getTracks, getTrackByID } from "#db/queries/tracks";
import express from "express";
export const tracksRouter = express.Router();

tracksRouter.get(`/`,  async (req, res) => {
  res.status(200).send(await getTracks());
});

tracksRouter.get(`/:id`,  async (req, res) => {
  const {id} = req.params;

  if(isNaN(id)) return res.status(400).send("That is an invalid ID");

  const track = await getTrackByID(id);
  track ?
    res.status(200).send(track)
    :
    res.status(404).send("That track doesn't exist");
});