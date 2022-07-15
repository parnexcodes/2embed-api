import { Router } from "express";

import axios from "axios";

import { TwoEmbed } from "../../providers/2embed";
import { tmdb } from "../../providers/tmdb";

const router = Router();

router.get("/details/:type/:id", async (req, res) => {

  try {
      const details = await axios.get(
        `${tmdb.url}/3/${req.params.type}/${req.params.id}?api_key=${tmdb.key}&append_to_response=credits,videos`
      ).then((res) => res.data);

      delete details.seasons;

      const query = {
        params: { 
        id: req.params.id,
        s: 'null',
        e: 'null'
    } 
  }
    const data = await TwoEmbed.getEmbedPageSrc(req.params.type, query);
    
    if (TwoEmbed.isSrc_available(data)) {
      return res.status(200).json({ details , is_src_available: true });
    } else {
      return res.status(200).json({ details , is_src_available: false });
    }
  } catch (err) {
    return res.status(404).json({ error: "incorrect request." });
  }
});

export default router;
