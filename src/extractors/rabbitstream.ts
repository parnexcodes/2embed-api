import axios from 'axios';

import * as cheerio from 'cheerio';
import * as Uri from "uri-js";
import CryptoJS from 'crypto-js'
import { isJson, substringAfter, substringBefore } from '../utils/util'

//2embed rabbitstream
export async function rabbitstreamExtract(url: string) {
    const uri = Uri.parse(url);

    const initial_page =  await axios.get(url.replace("embed-5","embed-4"), { headers: 
        { "Referer": uri.scheme + "://" + uri.host  } }).then(res => res.data);

    const $ = cheerio.load(initial_page);
    const data_id = $('#vidcloud-player').attr('data-id');
    const ajax_url = uri.scheme + "://" + uri.host + '/ajax/embed-4/getSources?id=' + data_id;

    let data = await axios.get(ajax_url, { headers: { 
        "X-Requested-With": "XMLHttpRequest" 
    } } ).then(res => res.data);

    // const decryptSource = async (encryptedSource) => {
    //     try { // Rabbitstream
    //         let decryptionKey = (await axios.get('https://raw.githubusercontent.com/enimax-anime/key/e4/key.txt')).data
    //         let bytes = CryptoJS.AES.decrypt(encryptedSource, decryptionKey);
    //         return (JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
    //     } catch (e) {
    //         console.log("Rabbitstream key failed to decrypt source")
    //     }
    // }

    
    // data.sources = await decryptSource(data.sources)

    if (!isJson(data.sources)) {
        let { data: key } = await axios.get('https://github.com/enimax-anime/key/blob/e4/key.txt');

        key = substringBefore(substringAfter(key, '"blob-code blob-code-inner js-file-line">'), '</td>');

        if (!key) {
          key = await (await axios.get('https://raw.githubusercontent.com/enimax-anime/key/e4/key.txt')).data;
        }
        const decryptedVal = CryptoJS.AES.decrypt(data.sources, key).toString(CryptoJS.enc.Utf8)
        data.sources = isJson(decryptedVal) ? JSON.parse(decryptedVal) : data.sources
      }

    // let hls_url: string; for(const hls_source of data.sources) hls_url = hls_source.file;

    // let hls_tracks = data.tracks.map((track: any) => (
    //     {url: track.file, label: track.label}
    // ));
    
    // var source = {
    //     hls_url: result,
    //     tracks: hls_tracks
    // };

    return {data};

 } 


    


