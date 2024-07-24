import constants from "./constants.js";

export const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    switch (statusCode) {
        case constants.NOT_FOUND:
            res.status(constants.NOT_FOUND).json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.status(constants.FORBIDDEN).json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.status(constants.UNAUTHORIZED).json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.SERVER_ERROR:
            res.status(constants.SERVER_ERROR).json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
        console.log("No Error");
        break;
    }
}















// export const handleError = (status, message) => {
//     const error = new Error();
//     error.status = status;
//     error.message = message;
//     return error;
// };