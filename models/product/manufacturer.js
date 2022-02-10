const mongoose = require("mongoose");
/* Category  adde here in schema */
const manufacturerSchema = new mongoose.Schema(
    {
        manufacturerName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        },
        description: {
            type: String,
            trim: true,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Manufacturer", manufacturerSchema);
