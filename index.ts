require('dotenv').config();
const express = require('express')
const app = express();
const PORT = 4001;

import connection from "./db/conn";
const mongoSanitize = require('express-mongo-sanitize')
app.use(mongoSanitize())
const cors = require('cors');

connection()
app.use(cors())
// const corsOpts = {
//     origin: '*',
//
//     methods: [
//       'GET',
//       'POST',
//     ],
//
//     allowedHeaders: [ 
//       'Content-Type',
//     ],
//   };
//
//   app.use(cors(corsOpts));
app.use(function(req:any, res:any, next:any) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
const router = require("./routes/routes");
require("./db/conn");
app.use(express.json())
const cookieParser = require("cookie-parser");
app.use(cookieParser())

app.use(router)
app.listen((PORT), () => {
    console.log(`server is listen on the port on ${PORT}`)
})
