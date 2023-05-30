const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "product name must be provided"]
    },
    price: {
        type: Number,
        required: [true, "product price must be provide"]
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values:  ["Google", "Microsoft", "Facebook", "Apple"],
            message: '{VALUE} is not supported'
        }
        //enum: ["Google", "Microsoft", "Facebook", "Apple"],

    }
});

module.exports = mongoose.model('Product', productSchema);