exports.userSignupValidator = (req, res, next) => {
  const errors_data = {};
  req.check("mobile", "Mobile no is required.").notEmpty()
  .isLength({
    min: 10,
    max: 10,
  }).withMessage("Mobile number must be 10 digit.");
  req.check("firstName", "First name is required.").notEmpty()
  .isLength({
    min: 3,
    max: 25
  });
  req.check("lastName", "Last name is required.").notEmpty()
  .isLength({
    min: 3,
    max: 25
  });
    const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(
      (error) => (errors_data[error.param] = error.msg)
    )[0];
    return res.status(400).json({
      errors: errors_data,
      status: false,
      message: "Something went wrong",
    });
  }
  next();
};

exports.userSignupValidator_old = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32,
    });
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
exports.maniValidator = (req, res, next) => {
    const errors_data = {};
    req.check('manufacturerName', 'Manufacturer name is required').notEmpty();
   // req.check('description', 'description name is required').notEmpty();
    const errors = req.validationErrors();
    // if (errors) {
    //     const firstError = errors.map(error => error.msg)[0];
    //     return res.status(400).json({ error: firstError });
    // }
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
//userManagementvalidation
exports.userValidator = (req, res, next) => {
  const errors_data = {};
  req.check("name", "Name is required").notEmpty();
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32,
    });
  req.check("password", "Password is required").notEmpty();
  req.check("mobile", "Mobile no must be 10 digit").isLength({
    min: 10,
    max: 10,
  });
  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors.map((error) => 
    errors_data[error.param] = error.msg
    );
    return res.status(400).json({ error: errors_data });
  }
  next();
};

//userManagementvalidation
exports.userUpdateValidator = (req, res, next) => {
  const errors_data = {};
  req.check("name", "Name is required").notEmpty();
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32,
    });
  // req.check("mobile", "Mobile no must be 10 digit").isLength({
  //   min: 10,
  //   max: 10,
  // });
  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors.map((error) => 
    errors_data[error.param] = error.msg
    );
    return res.status(400).json({ error: errors_data });
  }
  next();
};


exports.attributeValidator = (req, res, next) => {
    const errors_data = {};
    req.check('attributeName', 'Attribute name is required').notEmpty();
  //  req.check('dimension', 'Attribute Value is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) 
    {
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

exports.taxValidator = (req, res, next) => {
  const errors_data = {};
  req.check('taxName', 'Tax name is required').notEmpty();
//  req.check('dimension', 'Attribute Value is required').notEmpty();
  const errors = req.validationErrors();
  if (errors) 
  {
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

//shubha : error format

exports.storeValidator = (req, res, next) => {
    const errors_data = {};
    req.check('email', 'Email must be between 3 to 32 characters').matches(/.+\@.+\..+/).withMessage('Email must contain @').isLength({min: 4, max: 32});
    req.check('password','Password is required').notEmpty();
    req.check('storeName','Store name is required').notEmpty();
    req.check('ownerName', 'Owner Name is requied').notEmpty();
    req.check('address','Address is required').notEmpty();
    req.check('mobile','Mobile no must be 10 digit').isLength({ min: 10, max: 10 });
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
    req.check('assingTo','User Name is required').notEmpty();
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
// specification validation

exports.specificationValidator = (req, res, next) => {
    const errors_data = {};
    req.check('manufacturerName', 'Specification name is required').notEmpty();
    req.check('specification_type', 'Specification value is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) 
    {
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
// category validation
exports.categoryValidator = (req, res, next) => {
    const errors_data = {};
    req.check('name', 'Category name is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) 
    {
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
// products
exports.productValidator = (req, res, next) => {
  const errors_data = {};
  console.log(req)
  req.check('name', 'name is required').notEmpty();
  const errors = req.validationErrors();
  if (errors) 
    {
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

exports.proValidator = (req, res, next) => {
  const errors_data = {};
  req.check('price', 'Price is required').notEmpty();
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