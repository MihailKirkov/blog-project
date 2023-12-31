import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const getCookie = (req,res) => {
  console.log('cookies')
  console.log(req.cookies)
  return res.status(200).json(res.cookies)
}

export const register = (req, res) => {
  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  if (req.body.email === '' || req.body.username === '' || req.body.first_name === '' || req.body.last_name === '' || req.body.password === '') return res.status(400).json("Please fill out all fields!")

  db.query(q, [req.body.email, req.body.username, req.body.first_name, req.body.last_name], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("username/email already exists!");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`,`email`, `first_name`, `last_name`, `password`) VALUES (?)";
    const values = [req.body.username, req.body.email, req.body.first_name, req.body.last_name, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  //CHECK USER

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

      console.log("USER ID:", data[0].id)
      const token = jwt.sign({ id: data[0].id }, "jwtkey", {
        expiresIn: '1d',
      });
      const { password, ...other } = data[0];
  
      res.cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(other);
    
    
      console.log("we saved the cookie! - login/auth.js")
      console.log(token)
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure: true
  }).status(200).json("User has been logged out.")
};