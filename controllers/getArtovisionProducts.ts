import axios from 'axios';

const getProducts = async (req:any,res:any) => {
    try {
        const response = await axios.get(
            `https://seedsofplenty.myshopify.com/admin/api/2020-04/products.json?limit=250`,
            {
                headers: {
                    'X-Shopify-Access-Token': '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',
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(200).json(response.data);
    } catch (error : any) {
        res.status(400).send({ message: error.message })
    }
}

export default getProducts;