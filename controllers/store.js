const { json } = require('body-parser');
const StoreSchema = require('../models/store/store');

// Get moongose error

const errorFormat = e => {
    const errors = {};
    allError = e.substring(e.indexOf(':') + 1).trim();
    allErrorInArrayFormat = allError.split(',').map(e => e.trim());
    allErrorInArrayFormat.forEach(error =>{
        const [key , value] = error.split(':').map(err =>err.trim())
        errors[key] = value;
    })
    return errors;
}

// save store Api

exports.addStoreData = async (req,res) => {
    try{
        console.log(req.body);
        const {storeName,ownerName,address,userName,mobile,password,email} = req.body;
        var storeDetails = new StoreSchema({
                storeName : storeName,
                userName : userName,
                ownerName : ownerName,
                email : email,
                mobile : mobile ,
                password : password,
                address : address,
                tokan : "ttttttt" ,
        });
        ////
        await storeDetails.save();
        return res.json({
            status : true,
            message : "Store added Successfully"
        })
    }catch(e){
        return res.json({
            errors : errorFormat(e.message),
            status : false,
            message : "Something went wrong",
        })
    }
}

