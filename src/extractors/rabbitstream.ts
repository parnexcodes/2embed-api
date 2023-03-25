import axios from 'axios';

import * as cheerio from 'cheerio';
import * as Uri from "uri-js";
import CryptoJS from 'crypto-js'

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
    //     // There are 2 keys possible, just try them all
    //     try { // Dokicloud
    //         let decryptionKey = (await axios.get('https://raw.githubusercontent.com/consumet/rapidclown/dokicloud/key.txt')).data
    //         let bytes = CryptoJS.AES.decrypt(encryptedSource, decryptionKey);
    //         return (JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
    //     } catch(e) {
    //         console.log("Dokicloud key failed to decrypt source")
    //     }
    //     try { // Rabbitstream
    //         let decryptionKey = (await axios.get('https://raw.githubusercontent.com/enimax-anime/key/e6/key.txt')).data
    //         let bytes = CryptoJS.AES.decrypt(encryptedSource, decryptionKey);
    //         return (JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
    //     } catch (e) {
    //         console.log("Rabbitstream key failed to decrypt source")
    //     }
    // }

    // data.sources = await decryptSource(data.sources)

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


    


