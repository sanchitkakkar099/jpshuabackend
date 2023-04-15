const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    store_url: {
        type: String,
        required: true,
    },
    access_token: {
        type: String,
        required: true,
    }
})

const shops = mongoose.model('shop',ShopSchema)

export default shops;

