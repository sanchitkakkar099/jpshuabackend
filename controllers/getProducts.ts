import customers from "../schema/customerSchema";
const Shopify = require('shopify-api-node');
const getProducts = async (req:any,res:any) => {
    try {
        let customerId = req.body.customer;
        let findCustomer = await customers.findOne({email:customerId})
        let product_type = req.body.product_type;
        // let fullfill_sts = req.body.fullfill_sts;
        let sh_access_token = findCustomer.access_token;
        let sh_api_key = findCustomer.api_key;
        let sh_store_url = findCustomer.store_url;
        const shop = new Shopify({
            shopName : sh_store_url,
            password : sh_access_token,
            apiKey : sh_api_key
        })
        shop.product.list({limit : 10, status: product_type})
            .then((products :any) => res.send(products))
            .catch((err :any) => console.error(err.message));
    } catch (error : any) {
        res.status(400).send({ message: error.message })
    }
}

export default getProducts;