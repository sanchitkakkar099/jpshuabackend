
import user from "../schema/userschema";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
const loginUser = async (req: any, res: any) => {
    console.log('api of login')
    const { email, password } = req.body;
    console.log(email, password)

    if (!email || !password) {
        res.status(400).send({ message: "enter the email and pasword" })
    } else {

        const existuser = await user.findOne({ email: email });
        console.log(existuser)
        if (!existuser) {
            res.status(400).send({ message: "user is not exist" })
        } else {
            console.log(existuser.password)
            const isPasswordMatched = await bcrypt.compare(password, existuser.password);
            console.log(isPasswordMatched)
            if (isPasswordMatched) {
                const payload = {
                    _id: existuser._id,
                    role: existuser.role
                }
                const token = jwt.sign(payload, 'amangahf@gmail.com12222222222', {
                    expiresIn: "165d"
                });
                // console.log(token, 'this is the value of the cookies')
                // res.cookie("jwt", token,{
                //     httpOnly : true, sameSite : 'none'
                // })
                res.cookie("access_token", token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: Date.now() + 10 * 365 * 24 * 60 * 60,
                    sameSite: 'none',
                });
                
                res.send({
                    message: "successful",
                    jwt: token

                })
            } else {
                res.status(400).send({ message: "password mismatch" })
            }


        }
    }
}
export default loginUser;