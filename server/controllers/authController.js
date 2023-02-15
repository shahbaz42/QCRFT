import { google } from 'googleapis';
import User from '../models/User.js';
import jwt from "jsonwebtoken";

const getProfileInfo = async (access_token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
            const response = await fetch(url);
            const data = await response.json();
            resolve(data)
        } catch (err) {
            reject(err)
        }
    })
}

const requestValidations = (req, res, next) => {
    if (req.headers["x-requested-with"] !== "XMLHttpRequest") {
        return res.status(400).send("Invalid Request 1");
    }
    if (!req.body.code) {
        return res.status(400).send("Invalid Request 2");
    }
    next();
}
const googleAuthController = async (req, res) => {
    try {
        const { code } = req.body;
        // Super important to use "postmessage" as the redirect_uri
        // for a popup window. Otherwise, the OAuth2.0 flow will fail.
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            "postmessage"
        );

        let { tokens } = await oauth2Client.getToken(code);
        console.log(tokens);
        const profileInfo = await getProfileInfo(tokens.access_token);
        // check if the email is already in the database
        const email_in_db = await User.findOne({ email: profileInfo.email });
        if (email_in_db) {
            // update the tokens
            await User.findOneAndUpdate({ email: profileInfo.email }, {
                tokens : tokens,
            });

            const token = jwt.sign({ email: profileInfo.email }, process.env.JWT_SECRET, {
                expiresIn: "30d"
            });
            return res.status(200).json({
                result: "success",
                token
            })
        }

        const newUser = new User({
            name: profileInfo.name,
            email: profileInfo.email,
            picture: profileInfo.picture,
            tokens : tokens,
        });
        await newUser.save();

        const token = jwt.sign({ email: profileInfo.email }, process.env.JWT_SECRET, {
            expiresIn: "30d"
        });
        res.status(200).json({
            result: "success",
            token
        })
    } catch (err) {
        res.status(500).json({
            result: "error",
            message: err.message
        })
    }
}

export { requestValidations, googleAuthController }