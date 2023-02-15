const createQuizController = async (req, res) => {
    // console log headers
    // console.log(req.headers.authorization);
    // console.log(req.user);
    // console.log(req.body)
    // 
    // send req.user except tokens
    // console.log(req.user);
    res.status(200).send(req.user);
}

export { createQuizController }
