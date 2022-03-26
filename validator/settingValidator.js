exports.sliderValidition = (req ,res, next ) => {
    const errorData = {};
    console.log(req);
    req.check("title" , "Title is required.").notEmpty();
    req.check("sequence" , "Sequence is required.").notEmpty();
    const errors = req.validationErrors();
    if(errors){
        errors.map((error) => 
        errorData[error.param] = error.msg)
        return res.status(400).json({
            status :  false,
            errors : errorData,
        })
    }
    next();
}
