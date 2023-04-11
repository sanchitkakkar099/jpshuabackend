import customers from "../schema/customerSchema";
const Shopify = require('shopify-api-node');
const getOrders = async (req:any,res:any) => {
    try {
        let customerId = req.body.customer;
        let findCustomer = await customers.findOne({email:customerId})
        let fin_sts = req.body.fin_sts;
        let fullfill_sts = req.body.fullfill_sts;
        let sh_access_token = findCustomer.access_token;
        let sh_api_key = findCustomer.api_key;
        let sh_store_url = findCustomer.store_url;
        // console.log(req.body)
        const shop = new Shopify({
            shopName : sh_store_url,
            password : sh_access_token,
            apiKey : sh_api_key
        })
        shop.order.list({limit : 10,financial_status:fin_sts,fulfillment_status:fullfill_sts})
            .then((orders :any) => res.send(orders))
            .catch((err :any) => console.error(err.message));
    } catch (error : any) {
        res.status(400).send({ message: error.message })
    }
}

export default getOrders;