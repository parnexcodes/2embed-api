import { Router } from "express";
import axios from "axios";

import { tmdb } from "../../providers/tmdb";

const router = Router();

router.get("/home", async (_req, res) => {
  try {
     const trending_movies = await axios.get(
        `${tmdb.url}/3/trending/all/day?api_key=${tmdb.key}`
      ).then((res) => res.data.results);
      
      const trending_tv = await axios.get(
        `${tmdb.url}/3/trending/all/day?api_key=${tmdb.key}`
      ).then((res) => res.data.results);

      const popular_movies = await axios.get(
        `${tmdb.url}/3/movie/popular?api_key=${tmdb.key}`
      ).then((res) => res.data.results);

      const popular_tv = await axios.get(
        `${tmdb.url}/3/tv/popular?api_key=${tmdb.key}`
      ).then((res) => res.data.results);

      const top_movies = await axios.get(
        `${tmdb.url}/3/tv/popular?api_key=${tmdb.key}`
      ).then((res) => res.data.results);

      const top_tv = await axios.get(
        `${tmdb.url}/3/tv/popular?api_key=${tmdb.key}`
      ).then((res) => res.data.results);

      return res.status(200).json({trending_movies, trending_tv , 
        popular_movies, popular_tv, top_movies, top_tv});

  } catch (err) {
    return res.status(404).json({ error: "incorrect api parameter" });
  }
});

export default router;
