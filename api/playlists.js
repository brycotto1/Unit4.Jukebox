import { createPlaylist, getPlaylists, getPlaylistByID } from "#db/queries/playlists";
import { createPlaylistTrack, getTracksByPlaylistID } from "#db/queries/playlists_tracks";
import { getTrackByID } from "#db/queries/tracks";
import express from "express";
export const playlistsRouter = express.Router();

playlistsRouter.route('/')
  .get(async (req, res) => {
    res.status(200).send(await getPlaylists());
  })
  .post(async (req, res) => {
    const body = req.body;

    if(!body) return res.status(400).send("The request has no body");
    if(!body.name || !body.description) return res.status(400).send("A required field is missing");

    const newPlaylist = await createPlaylist(body.name, body.description);
    res.status(201).send(newPlaylist);
  })

playlistsRouter.route('/:id')
  .get(async (req, res) => {
    const {id} = req.params;
    
    if(isNaN(id)) return res.status(400).send("That is an invalid ID");
  
    const playlist = await getPlaylistByID(id);
    playlist ?
      res.status(200).send(playlist)
      :
      res.status(404).send("That playlist doesn't exist");
  })

playlistsRouter.route('/:id/tracks')
  .get(async (req, res) => {
    const {id} = req.params;

    if(isNaN(id)) return res.status(400).send("That is an invalid ID");
    
    const tracks = await getTracksByPlaylistID(id);
    tracks.length > 0 ?      
      res.status(200).send(tracks)
      :
      res.status(404).send("That playlist doesn't exist");
  })
  .post(async (req, res) => {
    const {id} = req.params;
    const body = req.body;

    if(!body) return res.status(400).send("The request has no body");
    if(!body.trackId) return res.status(400).send("A required field is missing");
    if(isNaN(id)) return res.status(400).send("That is an invalid ID");
    if(isNaN(body.trackId)) return res.status(400).send("That is an invalid track ID");
    if(!(await getTrackByID(body.trackId))) return res.status(400).send("That track does not exist");
    if(!(await getPlaylistByID(id))) return res.status(404).send("That playlist doesn't exist");

    const playlistTrack = await createPlaylistTrack(id, body.trackId);
    res.status(201).send(playlistTrack)
  })