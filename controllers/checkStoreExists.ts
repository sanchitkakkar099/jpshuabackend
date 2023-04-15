
const axios = require('axios');
const cookie = require('cookie');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
import shops from "../schema/shopSchema";
dotenv.config();

const StoreExists = async (req: any, res: any) => {
    try {
      const { shop, hmac, code, shopState } = req.query;
      console.log(shop)
      const findShop = await shops.findOne({name : shop})
      console.log(findShop);
      
      res.status(200).send(findShop) 
    } catch (error: any) {
      res.status(400).send({ message: error.message })
    }
  }

  export default StoreExists;