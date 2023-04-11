const dashboard = async (req: any, res: any) => {

    try {
        const user = req.user;
        console.log(user);
        res.status(200).send({ message: "this is the login data", data: user })
    } catch (error: any) {
        res.status(400).send({ message: error.message })
    }


}

export default dashboard;