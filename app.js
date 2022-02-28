const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();
// import routes
const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customer');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');
const storeRoutes = require('./routes/store');
const manufacturerRoutes = require('./routes/manufacturer');
const specificationRoutes = require('./routes/specification');
const custRoutes = require('./routes/cust');

const userManagementRoutes = require('./routes/userManagement');

// app
const app = express();

//moment js
app.locals.moment = require('moment');

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', customerRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', braintreeRoutes);
app.use('/api', orderRoutes);
app.use('/api', manufacturerRoutes);
app.use('/api', userManagementRoutes);
app.use('/api', custRoutes);
app.use('/api', userRoutes);
app.use('/api', storeRoutes);
app.use('/api', specificationRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
