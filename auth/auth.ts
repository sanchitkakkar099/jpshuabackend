// const jwt = require('jsonwebtoken');
// import user from "../schema/userSchema";

// const auth = async (req: any, res: any, next: any) => {

//     try {
//         console.log(req.cookies)
//         const token = req.cookies.jwt;
//         if (!token) {
//             res.status(401).send({ message: "user is not autheroised" })
//         } else {
//             const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
//             const id = verifyUser.id;
//             const validateUser = await user.findById({ _id: id });
//             if (!validateUser) {
//                 res.status(404).send("unauthorized")
//             }
//             res.send(verifyUser)
//             req.user = verifyUser;
//             next();
//         }

//     } catch (error) {
//         console.log(error)
//         res.status(400).send({ message: "error occurs" })

//     }

// }
// export default auth;

import user from "../schema/userschema";
import jwt from 'jsonwebtoken';

const auth = async (req: any, res: any, next: any) => {

    try {
        
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).send({ message: "user is not autheroised" })
        } else {
            const verifyUser: any = jwt.verify(token, "amangahf@gmail.com12222222222");
            console.log(verifyUser._id)
            const finduser = await user.findById({ _id: verifyUser?._id });
            if (finduser) {
                req.user = finduser;
            } else {
                res.status(400).send({ message: "user is not valid" })
            }
            next()

        }

    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "error occurs" })

    }














}

export default auth;