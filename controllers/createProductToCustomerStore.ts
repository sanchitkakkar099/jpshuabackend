import axios from 'axios';
import customers from "../schema/customerSchema";
const Shopify = require('shopify-api-node');
const createProductToCustomerStore = async (req:any,res:any) => {
    try {
        let customerId = req.body.customer;
        let findCustomer = await customers.findOne({email:customerId})
        let sh_access_token = findCustomer.access_token;
        let sh_api_key = findCustomer.api_key;
        let sh_store_url = findCustomer.store_url;
        const shop = new Shopify({
            shopName : sh_store_url,
            password : sh_access_token,
            apiKey : sh_api_key
        })
        shop.product.create({
            title : req.body.product.title,
            body_html : req.body.product.body_html,
            image : req.body.product.image,
            tags : "Artovision",
            product_type : req.body.product.product_type,
            vendor : req.body.product.vendor,
            variants : req.body.product.variants
        })
        res.status(200).json("Created Successfully")
    } catch (error : any) {
        res.status(400).send({ message: error.message })
    }
}

export default createProductToCustomerStore;