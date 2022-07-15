import axios from 'axios';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import qs from 'qs';

import * as cheerio from 'cheerio';
import * as Uri from "uri-js";

export async function getCaptchaToken(url: string, key: string) {
    const uri = Uri.parse(url);

    const domain: string = Base64.stringify(Utf8.parse(uri.scheme + "://" + uri.host + ":443")).replace(/=/g, ".");

    const recaptcha_out: string = await axios.get( "https://www.google.com/recaptcha/api.js?render=" + key).then(res => res.data);

    const v_token =  recaptcha_out.substring(recaptcha_out.indexOf("/releases/") + 10 ,recaptcha_out.indexOf("/recaptcha__en.js"));

    const anchor_out = await axios.get(`https://www.google.com/recaptcha/api2/anchor?ar=1&hl=en&size=invisible&cb=flicklax&k=${key}&co=${domain}&v=${v_token}`).then(res => res.data);

    const $ = cheerio.load(anchor_out);

    const recaptcha_token  = $("#recaptcha-token").attr("value");
    
    const data = {
        v: v_token,
        reason: "q",
        k: key,
        c: recaptcha_token,
        sa: "",
        co: domain,
    };

    const token_out = await axios.post(`https://www.google.com/recaptcha/api2/reload?k=${key}`, qs.stringify(data)
      , { headers: {"referer": "https://www.google.com/recaptcha/api2/"} }
   ).then(res => res.data);

    var token = token_out.match('rresp","(.+?)"')

    return token[1];

}

