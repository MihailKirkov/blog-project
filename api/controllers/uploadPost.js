import { IgApiClient } from "instagram-private-api"
import { promisify } from 'util';
import { readFile } from 'fs';
const readFileAsync = promisify(readFile);
import nodemailer from "nodemailer";



export const uploadToInstagram = (req, res) => {
    console.log(" UPLOAD TO INTSAGRAM", req.body)
    const postToInsta = async (ig_username, ig_password, img, content) => {
    
        const ig = new IgApiClient();
        ig.state.generateDevice(ig_username);
        await ig.account.login(ig_username, ig_password);
    
    
        await ig.publish.photo({
            file: await readFileAsync(img),
            caption: content,
        });
    }
    postToInsta(req.body.ig_username, req.body.ig_password, req.body.img, req.body.content);
}

export const sendEmail = (req, res) => {
    console.log("send email in api: ", req.body)
    const transporter = nodemailer.createTransport({
        service:'gmail',
        host:'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: req.body.sender,
            pass: req.body.pass
        }
    })
    
    const mailOptions = {
        from: {
            address: req.body.sender
        },
        to: req.body.reciever,
        subject: req.body.title,
        text: req.body.text,
        html: req.body.content,
        attachments: [
            {
                filename: req.body.img,
                path: `../client/public/upload/${req.body.img}`,
                contentType: `image/jpg`
            }
        ]
    }
    
    const sendMail = async(transporter, mailOptions) => {
        try {
            await transporter.sendMail(mailOptions);
            console.log("Email has been sent!");
        } catch (error) {
            console.error(error);
        }
    }
    
    sendMail(transporter, mailOptions)
}