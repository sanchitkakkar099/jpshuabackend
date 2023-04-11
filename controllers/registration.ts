import user from "../schema/userschema";
import bcrypt from "bcrypt";

const registrationuser = async (req: any, res: any) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body)
        if (!email || !password || !name) {
            res.status(400).send({ message: "enter all the deatils carefully" })
        } else {
            const existuser = await user.findOne({ email: email });
            console.log(existuser)
            if (existuser) {
                res.status(400).send({ message: "email is already exist" })
            } else {
                const bcryptpassword = await bcrypt.hash(password, 10);

                const usersave = await user.create({
                    name: name,
                    email: email,
                    password: bcryptpassword
                });
                console.log(usersave)
                res.send({ message: "successfully registered", data: usersave })
            }
        }


    } catch (error: any) {
        console.log(error)
        res.status(400).send({ message: error.message })
    }
}

export default registrationuser;