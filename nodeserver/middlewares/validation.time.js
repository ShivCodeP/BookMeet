const validation = (req,res,next) => {
    if(req.sessionStart<req.sessionEnd) {
        next()
    }
    return res.status(400).send({message:"Start time should be lesser that end time"})
}

export default validation;