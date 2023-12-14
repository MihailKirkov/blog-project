import jwt from "jsonwebtoken";

export const authorization = (req, res, next) => {
    console.log("authorization...")
    const token = req.cookies.access_token;
    console.log(req.cookies)
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, "jwtkey");
        req.userId = data.id;
        // req.userRole = data.role;
        console.log("Successfull authorization")
        return next();
    } catch {
        return res.sendStatus(403);
    }
};