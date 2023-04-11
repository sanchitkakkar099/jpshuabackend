import auth from "../auth/auth";
// const customers = require("../schema/customerSchema")
import customers from "../schema/customerSchema";
// Get all customers data which is stored in database
exports.getCustomers = async (req: any, res: any) => {
    try {
        const customer = await customers.find()
        return res.send({
            "msg": "Successfull",
            "data": customer
        })
    } catch (error) {
        return res.send(error)
    }
}

// Create a new customer

exports.createCustomer = async (req: any, res: any) => {
    try {
        // console.log(req.body)
        const customerCreate = await  customers.create(req.body)
        res.send({ message: "successfully registered", data: customerCreate })
    } catch (error) {
        return res.send(error)
    }
}

// Edit a specific customer with its id

exports.getCustomerDetails = async (req: any, res: any) => {
    try {
        let searchingId = req.body.email;
        let getCustomer = await customers.find({email:searchingId})
        return res.send({
            "message": "Customer Details Found Successfull",
            "data": getCustomer
        })
    } catch (error) {
        return res.send(error)
    }
}

// update a specific customer with its id

exports.updateCustomerDetails = async (req: any, res: any) => {
    try {
        let customer_id = req.body.email;
        let updateCustomer = customers.findOneAndUpdate(
            { email: customer_id },
            { $set: { name: req.body.name, access_token : req.body.access_token } })
        return res.send({
            "message": "Customer Details Found Successfull",
            "data": updateCustomer
        })
    } catch (error) {
        return res.send(error)
    }
}

// delete a customer from database
exports.deleteCustomer = async (req : any,res:any) => {
    try {
        const category = await customers.find({email:req.body.email});

        await category.remove();

        res.status(200).json({
            success: true,
        });
    }catch (err){
        return res.send(err)
    }
}