const { json } = require("express");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/linenotify", (req, res) => {
    const { message, imageUrl } = req.body;
    const request = require('request');
    const accessToken = 's3X00hZmjmELFT2epvgR2BdfyhSm5CLjy2rYPwyydI8'
    request({
        method: 'POST',
        uri: 'https://notify-api.line.me/api/notify',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
            bearer: accessToken
        },
        form: {
            message: message
        }
    }, (err, httpResponse, body) => {
        if (err) {
            console.log('error: ', err);
            res.status(500).send(err);
        } else {
            console.log('body: ', body);
            res.status(200).send(body);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);
