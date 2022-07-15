import { Router } from "express";
import { TwoEmbed } from "../../providers/2embed";

const router = Router();

//ex. host/api/get_source/tv?id=37854&s=1&e=1
router.get("/get_source/:type", async (req, res) => {
    
    try {
      const query = {
          params: { 
          id: req.query.id,
          s:  req.query.s,
          e:  req.query.e
      } 
    }
      const embed_page = await TwoEmbed.getEmbedPageSrc(req.params.type, query);
    
      const source = await TwoEmbed.extract_content(embed_page);

      return res.status(200).json(source);
    } catch(err){
      return res.status(404).json({ error: "there is no sources available." });
    }
  
});

export default router;
