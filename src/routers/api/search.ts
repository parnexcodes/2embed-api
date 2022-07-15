import { Router } from "express";
import axios from "axios";

import { tmdb } from "../../providers/tmdb";

const router = Router();

//ex. /api/search/tv?query=one%20piece
router.get("/search/:type", async (req, res) => {
  try {
    const results = await axios.get(
        `${tmdb.url}/3/search/${req.params.type}`, {
            params: { 
            api_key: tmdb.key,
            query: req.query.query,
        } } ).then((res) => res.data.results);
   
      return res.status(404).json({ results, available: false });

  } catch (err) {
    return res.status(404).json({ error: "incorrect request" });
  }
});

export default router;
