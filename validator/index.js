exports.userSignupValidator = (req, res, next) => {
    const errors_data = {};
    req.check('phone_number', 'Phone number is required').notEmpty();
    req.check('first_name', 'First name is required').notEmpty();
    req.check('last_name', 'Last name is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map((error) =>
        errors_data[error.param] = error.msg
        );
        return res.status(400).json({ 
            errors: errors_data,
            status: false,
            message: "Something went wrong"
        });
    }
    next();
};

exports.userSignupValidator_old = (req, res, next) => {
    req.check('name', 'Name is required').notEmpty();
    req.check('email', 'Email must be between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number');
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};
exports.maniValidator = (req, res, next) => {
    req.check('manufacturerName', 'Manufacturer name is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.attributeValidator = (req, res, next) => {
    req.check('attributeName', 'Attribute name is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

//shubha : error format


exports.storeValidator = (req, res, next) => {
    const errors_data = {};
    req.check('email', 'Email must be between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password','Password is required').notEmpty();
    req.check('storeName','Store name is required').notEmpty();
    req.check('ownerName', 'Owner Name is requied').notEmpty();
    req.check('address','Address is required').notEmpty();
    req.check('mobile','Mobile no must be 10 digit')
    .isLength({
        min: 10,
        max: 10
    });
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map((error) =>
        errors_data[error.param] = error.msg
        );
        return res.status(400).json({ 
            errors: errors_data,
            status: false,
            message: "Something went wrong"
        });
    }
    next();
}

exports.userRoleValidator = (req, res, next) =>{
    const errors_data = {};
    req.check('roleName','Role Name is required').notEmpty();
    req.check('accessModuleId','Access Module is required').notEmpty();
    req.check('assingTo','User Id is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map((error) =>
        errors_data[error.param] = error.msg
        );
        return res.status(400).json({ 
            errors: errors_data,
            status: false,
            message: "Something went wrong"
        });
    }
    next();
}