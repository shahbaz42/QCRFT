const { google } = require('googleapis');
require("dotenv").config();

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
    // Super important to use "postmessage" as the redirect_uri
    // for a popup window. Otherwise, the OAuth2.0 flow will fail.
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        "postmessage"
    );

    const { code } = req.body;
    let { tokens } = await oauth2Client.getToken(code);
    console.log(tokens);
    res.send(req.body);
}