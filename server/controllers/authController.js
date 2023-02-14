const { google } = require('googleapis');
const User = require('../models/User');

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

exports.requestValidations = (req, res, next) => {
    if (req.headers["x-requested-with"] !== "XMLHttpRequest") {
        return res.status(400).send("Invalid Request 1");
    }
    if (!req.body.code) {
        return res.status(400).send("Invalid Request 2");
    }
    next();
}

exports.googleAuthController = async (req, res) => {
    const { code } = req.body;
    // Super important to use "postmessage" as the redirect_uri
    // for a popup window. Otherwise, the OAuth2.0 flow will fail.
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        "postmessage"
    );

    let { tokens } = await oauth2Client.getToken(code);
    const profileInfo = await getProfileInfo(tokens.access_token);
    const dbdta = {
        name: profileInfo.name,
        email: profileInfo.email,
        picture: profileInfo.picture,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        scope: tokens.scope,
        token_type: tokens.token_type,
        expiry_date: tokens.expiry_date
    }
    console.log(dbdta);
    res.send(dbdta);
}