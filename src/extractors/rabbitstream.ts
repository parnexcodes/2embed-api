import axios from 'axios';

import * as cheerio from 'cheerio';
import * as Uri from "uri-js";

//2embed rabbitstream
export async function rabbitstreamExtract(url: string) {
    const uri = Uri.parse(url);

    const initial_page =  await axios.get(url.replace("embed-5","embed-4"), { headers: 
        { "Referer": uri.scheme + "://" + uri.host  } }).then(res => res.data);

    const $ = cheerio.load(initial_page);
    const data_id = $('#vidcloud-player').attr('data-id');
    const ajax_url = uri.scheme + "://" + uri.host + '/ajax/embed-6/getSources?id=' + data_id;

    const data = await axios.get(ajax_url, { headers: { 
        "X-Requested-With": "XMLHttpRequest" 
    } } ).then(res => res.data);

    let hls_url: string; for(const hls_source of data.sources) hls_url = hls_source.file;

    let hls_tracks = data.tracks.map((track: any) => (
        {url: track.file, label: track.label}
    ));
    
    var source = {
        hls_url: hls_url,
        tracks: hls_tracks
    };

    return {source};

 } 


    


