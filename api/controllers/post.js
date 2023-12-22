import { db } from "../db.js"
import jwt from "jsonwebtoken";
import { getCookie } from "./auth.js";


export const getPosts = (req,res) => {
    console.log('getposts', req.query, req.params.group_name)
    const q = req.params.group_name
    ? "SELECT p.id, p.group_name, `username`, `title`, `desc`, `content`, `created_at`, p.img, u.img AS userImg FROM users u JOIN posts p ON u.id=p.user_id WHERE p.group_name=?"
    : "SELECT p.id, `username`, `title`, `desc`, `content`, `created_at`, p.img, u.img AS userImg FROM users u JOIN posts p ON u.id=p.user_id WHERE is_global=1";
    

    db.query(q,[req.params.group_name], (err,data)=>{
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    })
}

export const getPost = (req,res) => {
    const q = "SELECT p.id, `username`, `title`, `desc`, `content`, p.img, u.img AS userImg, u.id AS userId, `created_at` FROM users u JOIN posts p ON u.id=p.user_id WHERE p.id = ?"

    db.query(q,[req.params.id], (err,data)=>{
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0])
    })
}

export const getUserPosts = (req, res) => {
    const q = 
    "SELECT p.id, `username`, `title`, `desc`, `content`, `created_at`, p.img, u.img AS userImg FROM posts p JOIN users u ON p.user_id=u.id WHERE user_id=?"
    console.log('getuserposts', req.params)
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

        const q = "INSERT INTO posts (`title`, `desc`, `content`, `img`, `user_id`, `created_at`, `group_id`, `group_name`, `is_global`) VALUES (?)"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.content,
            req.body.img,
            // userInfo.id
            req.body.user_id,
            req.body.created_at,
            req.body.group_id,
            req.body.group_name,
            req.body.is_global

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
        const userId = 2 //
        console.log(req.cookies)
        console.log("postid,userid:", postId, userId)
        const q = "DELETE FROM posts WHERE `id` = ? AND `user_id` = ?"

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
        const q = "UPDATE posts p SET p.title=?, p.desc=?, p.content=?, p.img=? WHERE p.id=?"
        const values = [
            req.body.title,
            req.body.desc,
            req.body.content,
            req.body.img
        ]
        console.log(values, postId)
        db.query(q, [...values, postId], (err,data)=>{
            if (err) return res.status(500).json(err);
            return res.json("Post has been updated.")
        })
    // });
}