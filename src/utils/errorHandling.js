export const asyncHandler = (Method) => {
    return (req, res, next) => {
        Method(req, res, next).catch((error) => {
            return next(new Error(error));
        });
    }
}
export const globalErrorHandling = (error, req, res, next) => {
    return res.status(error.cause || 400).json({
        Message: "Failure",
        Success: false,
        message: error.message,
        error,
        stack: error.stack
    });
};