const Product = require("../models/product");   


const getAllProducts = async (req, res) => {
    const {name, company, featured, sort, fields, numericFilters} = req.query

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

    //Adding Numberic Filters
    if(numericFilters) {
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "=": "$eq",
            "<": "$lt",
            "<=": "$lte"
        }
        
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        const filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
        //console.log(filters)

        const options = ["price", "rating"]

        filters = filters.split(",").forEach((item) => {
            const [field, operator,value] = item.split("-")        
            if(options.includes(field)){
                queryObject[field] = {[operator]: Number(value)}
            }
        })

        //console.log(numericFilters)
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

    if(fields) {
        const fieldsList = fields.split(",").join(' ')
        result = result.select(fieldsList);
        console.log(fieldsList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);


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