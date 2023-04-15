import axios from 'axios';
import customers from "../schema/customerSchema";
const Shopify = require('shopify-api-node');
const createProductToCustomerStore = async (req:any,res:any) => {
    try {
        let product = req.body.product;
        let data = JSON.stringify({
            "product": {
              "title": `${product.title}`,
              "body_html": `${product.body_html}`,
              "vendor": `${product.vendor}`,
              "product_type": `${product.product_type}`,
              "status": `${product.status}`,
              "tags" : `Artovision`,
              "image" : product.image 
            }
          });
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://xavatesting.myshopify.com//admin/api/2023-01/products.json',
            headers: { 
              'X-Shopify-Access-Token': 'shpua_81c086445ba6fea82e5262fb176820ae', 
              'Accept': 'application/json', 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
        res.status(200).json("Created Successfully")
    } catch (error : any) {
        res.status(400).send({ message: error.message })
    }
}

export default createProductToCustomerStore;