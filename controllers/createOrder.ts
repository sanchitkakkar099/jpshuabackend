const customers = require("../schema/customerSchema")
// Import Shopify Api Client
const ShopifyAPIClient = require('shopify-api-node');

// Create a new instance of shopify
const shopify = new ShopifyAPIClient({
    shopName: 'your-store.myshopify.com',
    apiKey: 'your-api-key',
    password: 'your-api-password'
  });
const createOrder = async (req: any, res: any) => {

    try {
        const orderBody = req.body;
        const customerId = req.body.customer_id;
        const getCustomer = customers.findById(customerId)
        let sh_access_token = getCustomer.access_token;
        let sh_api_key = getCustomer.api_key;
        let sh_api_secret = getCustomer.api_secret;
        let sh_store_url = getCustomer.store_url; 

        let orderToCreate = {
            email: 'customer@example.com',
            line_items: [
              {
                variant_id: 123456789,
                quantity: 1
              }
            ]
        }

        const createdOrder = await shopify.order.create(orderToCreate);
        return res.send(createdOrder)
    } catch (error: any) {
        res.status(400).send({ message: error.message })
    }


}

export default createOrder;