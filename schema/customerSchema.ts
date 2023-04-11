const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
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
    },
    storefront_token: {
        type: String,
        required: false,
        default : null
    },
    api_key: {
        type: String,
        required: true,
    },
    api_secret: {
        type: String,
        required: true,
    },
    api_version: {
        type: String,
        required: true,
    }
})

const customers = mongoose.model('customer',CustomerSchema)

export default customers;

