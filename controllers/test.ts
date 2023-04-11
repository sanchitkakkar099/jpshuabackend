const test = async (req: any, res: any) => {
    console.log(req.user);
    const user = req.user;
    res.send({ message: "helloo", data: user })
}
export default test;