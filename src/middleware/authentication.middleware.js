import { asyncHandler } from "../utils/errorHandling.js"
export const autherized = (role) => {
    return asyncHandler(async (req, res, next) => {
        if (role !== req.user.role)
            return next(new Error("user is not autherized", { cause: 403 }));
        return next();
    });
}
