const { CustomAPIError } = require("../erros/custom-error");
const errorHandleMiddleware = (err, req, res, next) => {
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message});
    }
    return res.status(500).json({msg: err})
}

module.exports = errorHandleMiddleware