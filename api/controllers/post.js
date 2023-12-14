import { db } from "../db.js"
import jwt from "jsonwebtoken";
import { getCookie } from "./auth.js";


export const getPosts = (req,res) => {
    console.log('getposts')
    const q = req.query.cat
    ? "SELECT * FROM posts WHERE group=?"
    : "SELECT p.id, `username`, `title`, `desc`, `content`, `created_at`, p.img, u.img AS userImg FROM users u JOIN posts p ON u.id=p.userId";
    

    db.query(q,[req.query.group], (err,data)=>{
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    })
}

export const getPost = (req,res) => {
    const q = "SELECT p.id, `username`, `title`, `desc`, `content`, p.img, u.img AS userImg, `created_at` FROM users u JOIN posts p ON u.id=p.userId WHERE p.id = ?"

    db.query(q,[req.params.id], (err,data)=>{
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0])
    })
}

export const getUserPosts = (req, res) => {
    const q = 
    "SELECT p.id, `username`, `title`, `desc`, `content`, `created_at`, p.img, u.img AS userImg FROM posts p JOIN users u ON p.userId=u.id WHERE userId=2"
    // : "SELECT p.id, `username`, `title`, `desc`, `content`, `created_at`, p.img, u.img AS userImg, `created_at` FROM users u JOIN posts p ON u.id=p.userId";
    // console.log('getuserposts')
    db.query(q,[req.params.id], (err,data)=>{
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    })
}

export const addPost = (req,res) => {
    // console.log("Add Post/post.js")
    // const token = req.cookies.access_token;
    // console.log('addpost cookies:', req.cookies)
    // return res.status(200).json(req.cookies)
    // if (!token) return res.status(401).json("Not authenticated! jwt token error")

    // jwt.verify(token,"jwtkey", (err, userInfo)=>{
    //     if(err) return res.status(403).json("Token is not valid!")

        const q = "INSERT INTO posts (`title`, `desc`, `img`, `userId`) VALUES (?)"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            // userInfo.id
            2
        ]
        db.query(q,[values], (err,data)=>{
            if (err) return res.status(500).json(err);
            return res.json("Post has been created.")
        })
    // });


}

export const deletePost = (req,res) => {
    // const { currentUser} = useContext(AuthContext);

    // const token = req.cookies.access_token
    // if (!token) return res.status(401).json("Not authenticated!")

    // jwt.verify(token,"jwtkey", (err, userInfo)=>{
    //     if(err) return res.status(403).json("Token is not valid!")

        const postId = req.params.id
        const userId = req.body
        console.log(req.cookies)
        console.log("postid,userid:", postId, userId)
        const q = "DELETE FROM posts WHERE `id` = ? AND `userId` = ?"

        db.query(q,[postId, userId], (err,data)=>{
            if(err) return res.status(403).json("You can delete only your post!")

            return res.json("Post has been deleted!");
        })
    // })
}

export const updatePost = (req,res) => {
    console.log("update post...")
    // const token = req.cookies.access_token
    
    // if (!token) return res.status(401).json("Not authenticated!")
    
    // jwt.verify(token,"jwtkey", (err, userInfo)=>{
    //     if(err) return res.status(403).json("Token is not valid!")

        const postId = req.params.id;
        const q = "UPDATE posts p SET p.title=?, p.desc=?, p.content=? WHERE p.id=?"
        const values = [
            req.body.title,
            req.body.desc,
            req.body.content,
        ]
        console.log(values, postId)
        db.query(q, [...values, postId], (err,data)=>{
            if (err) return res.status(500).json(err);
            return res.json("Post has been updated.")
        })
    // });
}