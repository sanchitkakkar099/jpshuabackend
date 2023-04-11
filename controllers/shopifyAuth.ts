
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

const getShopName = (req: any, res: any) => {
  try {
    let shopName = req.body.shopname;
    console.log(shopName);
    
    // console.log(shopName);
    // return res.json("Test Done",shopName)
    const state = nonce();
    // Here is the redirect url is added on which one the shop name is added it will be added
    const redirectURL = "https://jellyfish-app-wg6fl.ondigitalocean.app/installapp/callback";
    // Here we are constructing the Shopify App Installation URL
    const shopifyURL = 'https://' + shopName +

      '/admin/oauth/authorize?client_id=' + apiKey +

      '&scope=' + scopes +

      '&state=' + state +

      '&redirect_uri=' + redirectURL;
    res.cookie('state', state);
    res.status(200).send({'redirectURL': shopifyURL})
    // Here we are redirecting it on the installation url
    // res.redirect(shopifyURL);
  } catch (error: any) {
    res.status(400).send({ message: error.message })
  }
}

export default getShopName;