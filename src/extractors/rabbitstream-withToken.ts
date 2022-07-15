import axios from 'axios';

import * as cheerio from 'cheerio';
import * as Uri from "uri-js";

import { getCaptchaToken } from "../utils/get_token";

export async function rabbitstreamExtract(url: string) {

    const uri = Uri.parse(url);

    const initial_page =  await axios.get(url.replace("embed-5","embed-4"), { headers: { "Referer": uri.scheme + "://" + uri.host  } }).then(res => res.data);

    const site_key_match = initial_page.match("recaptchaSiteKey = '(.+?)'");

    if(site_key_match == null)
        return;
 
    const number_match =  initial_page.match("recaptchaNumber = '(.+?)'");

    if(number_match == null)
        return;

    const token = await getCaptchaToken(url.replace("embed-5","embed-4"), site_key_match[1]);
    const $ = cheerio.load(initial_page);
    const data_id = $('#vidcloud-player').attr('data-id');
    const ajax_url = uri.scheme + "://" + uri.host + '/ajax/embed-4/getSources?id=' + data_id + '&token=' + token + '&number=' + number_match[1];

    return await axios.get(ajax_url, { headers: { "X-Requested-With": "XMLHttpRequest" } }).then(res => res.data);

 } 


    


