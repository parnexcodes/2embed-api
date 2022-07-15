import axios from 'axios';

import * as cheerio from "cheerio";

import { getCaptchaToken }   from "../utils/get_token";
import { rabbitstreamExtract } from "../extractors/rabbitstream";


export class TwoEmbed {
    static url = "https://www.2embed.to";

    static isSrc_available(embed_page: string) {
        if(embed_page !== null){
            const $ = cheerio.load(embed_page);
            return $("title").text() !== "404 Page Not Found";
        } else{
            return false;
        }
    }   

    
    static list_episodes(library_page: string, season_n: any) {
        var $ = cheerio.load(library_page);
      
        let list_episodes = [];
        let episode_names = [];
        $('.episode-item').each(function (index, element) {
            list_episodes[index] = $(element).attr("data-number");
            episode_names[index] = $(element).text().substring($(element).text().indexOf(":") + 2);
        });
        
        let sum_total_eps = 0;
        let prev_sum_total_eps = 0;

        let season_details = [];
        var index = 0;
        $(".season-item").each(function (i,el) {
            sum_total_eps +=  $(`#ss-episodes-${i+1}`).find("div > div > a").length;
            prev_sum_total_eps += $(`#ss-episodes-${i}`).find("div > div > a").length;
            
            let season_number = $(el).attr("data-number");
            let episodes_id = list_episodes.slice(prev_sum_total_eps, sum_total_eps); 
            let epstotal = episodes_id.length;
  
            season_details[i] = {season_number, epstotal};
            
            let episodes = [];

            if (season_n == season_number) {
                episodes_id.forEach((episode_number, index) => {
                    const title = episode_names[index+prev_sum_total_eps];
                    episodes[index] = { episode_number, title};
                   
                });
                index = i;
                season_details[index] = { episodes, season_number, epstotal  };
            }
 
        });
       if(season_n == "all"){
            return {season_details};
       }
       return season_details[index];
    }
    static async extract_content(embed_page: string) {
        const $ = cheerio.load(embed_page);
  
        const source_id = $(".item-server").map(function(){
            if ($(this).text().includes("Vidcloud")) {
              return $(this).attr("data-id");
            } 
            }).get().toString();
    
        const site_key: string = $("body").attr("data-recaptcha-key");
        
        const token = await getCaptchaToken(TwoEmbed.url, site_key);
        const rabbitstream_url = await axios.get(`${TwoEmbed.url}/ajax/embed/play?id=
                            ${source_id}&_token=${token}`,{ 
                                headers: { 
                                    "Referer": TwoEmbed.url 
                                } 
                            } ).then(res => res.data.link);
        return await rabbitstreamExtract(rabbitstream_url);

     } 

     static async getEmbedPageSrc(type: string, arg: any){
        try {
          return await axios.get(
            `${TwoEmbed.url}/embed/tmdb/${type}`, {
                params: { 
                id: arg.params.id,
                s:  arg.params.s,
                e:  arg.params.e
            } } ).then((res) => res.data ) ;
        
        } catch (error) {
          return null;
        }
      }
     

}
