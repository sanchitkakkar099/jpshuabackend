const mongoose = require("mongoose");

const { MONGO_URI } = process.env;
const connection = async () => {
    await mongoose.connect(MONGO_URI).then((data: any) => {
        console.log('connected')
    }).catch((err: any) => {
        console.log(err, 'error is occures')
    })
}

export default connection;