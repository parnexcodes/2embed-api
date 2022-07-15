import { Router } from "express";
import axios from "axios";

import { TwoEmbed } from "../../providers/2embed";

const router = Router();

router.get("/episodes/tv/:id/seasons/:season_n_query", async (req, res) => {
  try {
    const library_page = await axios.get(
        `${TwoEmbed.url}/library/tv/${req.params.id}`, 
         { timeout: 3500 }).then((res) => res.data);

    const season_n_query = req.params.season_n_query;
   
    const episodes = TwoEmbed.list_episodes(library_page, season_n_query);
 
    return res.status(200).json(episodes);
  } catch (err) {
    return res.status(404).json({ error: "No media source found." });
  }
});

export default router;
