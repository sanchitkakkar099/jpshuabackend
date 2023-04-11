
const axios = require('axios');
const cookie = require('cookie');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const crypto = require('crypto');
const nonce = require('nonce')();
const request = require('request-promise');
const querystring = require('querystring');
dotenv.config();
const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, FORWARDING_ADDRESS, SCOPES } = process.env;

const apiKey = SHOPIFY_API_KEY;
const apisecret = SHOPIFY_API_SECRET;
const forwardingaddress = FORWARDING_ADDRESS;
const scopes = SCOPES;
const ShopifyCallback = (req: any, res: any) => {
    try {
      const { shop, hmac, code, shopState } = req.query;
      const stateCookie = cookie.parse(req.headers.cookie).shopState;
      if (shopState !== stateCookie) {
        return res.status(400).send("request origin cannot be found");
      }
      if (shop && hmac && code) {
        const Map = Object.assign({}, req.query);
        delete Map['hmac'];
        const message = querystring.stringify(Map);
        const generatehmac = crypto
          .createHmac('sha256', apisecret)
          .update(message)
          .digest('hex');
  
        if (generatehmac !== hmac) {
          return res.status(403).send("validation failed")
        }
        const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
        const accessTokenPayload = {
          client_id: apiKey,
          client_secret: apisecret,
          code,
        };
        request.post(accessTokenRequestUrl, {json:accessTokenPayload})
        .then((accessTokenResponse : any)=>{
            console.log(accessTokenResponse);
            const accessToken = accessTokenResponse.access_token;
        })
      }
    } catch (error: any) {
      res.status(400).send({ message: error.message })
    }
  }

  export default ShopifyCallback;