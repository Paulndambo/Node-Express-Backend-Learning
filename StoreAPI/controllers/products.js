const Product = require("../models/product");   


const getAllProducts = async (req, res) => {
    const {name, company, featured, sort} = req.query

    const queryObject = {}

    if(featured){
        queryObject.featured = featured === "true" ? true : false
    }

    if(company) {
        queryObject.company = company
    }

    if(name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }
    console.log(queryObject);
    let result = Product.find(queryObject)

    if(sort){
        const sortList = sort.split(",").join(" ")
        result = result.sort(sortList)
        console.log(sortList)
    } else {
        result = result.sort('createdAt')
    }
    const products = await result
    res.status(200).json({products, count: products.length})
}

const createProduct = async(req, res) => {
    res.status(201).json({msg: "product created successfully!!"})
}

const getSingleProduct = async(req, res) => {
    const { productId } = req.params
    res.status(200).json({msg: `Product ID: ${productId} found`})
} 

const updateProduct = async(req, res) => {
    const { productId } = req.params
    res.status(200).json({msg: `Product ID: ${productId} updated!!`})
}

const deleteProduct = async(req, res) => {
    const { productId } = req.params
    res.status(200).json({msg: `Product ID: ${productId} deleted`})
}

module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
}