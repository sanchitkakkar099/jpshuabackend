import getArtovisionProducts from "../controllers/getArtovisionProducts";

const express = require('express')
import bodyParser from 'body-parser'
const router = express.Router();

const {getCustomers,createCustomer,getCustomerDetails,updateCustomerDetails} = require("../controllers/customers")
// const {getShopName,ShopifyCallback} = require("../controllers/shopifyAuth")
import getShopName from "../controllers/shopifyAuth"
import ShopifyCallback from "../controllers/shopifyCallback"
import registrationuser from '../controllers/registration';
import loginUser from '../controllers/login';
import logoutUser from '../controllers/logoutuser';
import test from '../controllers/test';
import auth from '../auth/auth';
import dashboard from '../controllers/dashboard';
import getOrders from '../controllers/getOrders';
import createOrder from '../controllers/createOrder';
import getProducts from '../controllers/getProducts';

router.use(bodyParser.urlencoded({
    extended: true
}));

router.get("/home", auth, test)
router.post("/user/register", registrationuser);
router.post('/user/login', loginUser);
router.get('/user/logout', logoutUser)
router.get('/dashboard', auth, dashboard);
router.post('/admin/getProducts',getProducts)
router.post('/admin/getOrders',getOrders)
router.get('/admin/createOrder',createOrder)

// Get all the artovison products
router.get('/admin/products/artovision', getArtovisionProducts)

// Customer Crud Routes
router.get('/allcustomer',getCustomers)
router.post('/createCustomer',createCustomer)
router.get('/getCustomerDetails',getCustomerDetails)
router.post('/updateCustomer',updateCustomerDetails)

// Shopify Authentication Routes
router.post('/install/app',getShopName)
router.post('/shopify/callback',ShopifyCallback)

module.exports = router;