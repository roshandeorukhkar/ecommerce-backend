const mongoose = require("mongoose");
/* Category  adde here in schema */
const specificationSchema = new mongoose.Schema(
    {
        manufacturerName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        },
        specification_type: {
            type: String,
            trim: true,
            required: true
        },
        description: {
            type: String,
            trim: true,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Specification", specificationSchema);
