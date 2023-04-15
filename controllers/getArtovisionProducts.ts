import axios from 'axios';
// Import Shopify Api Client
const ShopifyAPIClient = require('shopify-api-node');
const getProducts = async (req:any,res:any) => {
    try {
        const shopify = new ShopifyAPIClient({
            shopName: 'store-caroline98.myshopify.com',
            apiKey: 'c380b8ab11cca15c900b462e092ce21d',
            password: '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'
          });
          
        const products = await shopify.product.list({limit : 250});  
        // const response = await axios.get(
        //     `https://seedsofplenty.myshopify.com/admin/api/2020-04/products.json?limit=250`,
        //     {
        //         headers: {
        //             'X-Shopify-Access-Token': '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',
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
        //         },
        //     }
        // );
         console.log(products);
          
        res.status(200).json(products);
    } catch (error : any) {
        res.status(400).send({ message: error.message })
    }
}

export default getProducts;