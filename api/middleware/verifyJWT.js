import jwt from "jsonwebtoken";
import { db } from "../db.js"

export const authUserRole = (permissions) => {
    return (req,res,next) => {
        console.log(req.body)
        console.log("checking if role allows access")
        const userRole = "admin";
        if (permissions.includes(userRole)) {
            console.log("it does")
            next();
        } else {
            return res.status(401).json("User Does Not Have Access")
        }
    }
}

export const authGroupExists = () => {
    return (req, res, next) => {
        console.log(`Checking if group ${req.params.group_name} exists`);

        const q = "SELECT * FROM `groups` WHERE `name`=?";

        db.query(q, [req.params.group_name], (err, data) => {
            if (err) {
                // An error occurred while querying the database
                console.error("Error checking group existence:", err);
                return res.status(500).json("Group Does Not Exist!");
            }

            // Check if the group exists based on the query result
            const exists = data.length > 0;

            if (exists) {
                console.log("It exists!");
                next();
            } else {
                console.log("It does NOT exist!");
                return res.status(500).json("Group Does Not Exist");
            }
        });
    };
};

export const authorization = (req, res, next) => {
    console.log("authorization...")

    // const token = req.cookies.access_token;
    // console.log(req.cookies)
    // if (!token) {
    //     return res.sendStatus(403);
    // }
    // try {
    //     const data = jwt.verify(token, "jwtkey");
    //     req.userId = data.id;
    //     // req.userRole = data.role;
    //     console.log("Successfull authorization")
    //     return next();
    // } catch {
    //     return res.sendStatus(403);
    // }
};

// export const verify = (req, res, next) => {
    
//     const authHeader = req.headers.cookie.split("=")[1]

    
//     console.log(authHeader)
//     if (authHeader) {
//         const token = authHeader.split(" ")[1];

//         jwt.verify(token,"jwtkey", (err,user)=> {
//             if (err) {
//                 return res.status(401).json("Token is not valid! aaa");
//             }

//             req.user = user;
//             next();
//         })
//     } else {
//         res.status(401).json("You are not authenticated! aaa")
//     }
// }