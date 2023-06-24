const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'wiccamagazine@gmail.com',
        pass: 'Niteclub2'
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        // getting dest email by query string
        const dest = req.query.dest;

        const mailOptions = {
            from: `${req.body.name}`,
            to: dest,
            subject: `Need support`, // email subject
            html: `<p style="font-size: 16px;">Full Name: ${req.body.name}</p>
                <p style="font-size: 16px;">Phone Number: ${req.body.phone}</p>
                <p style="font-size: 16px;">Email Address: ${req.body.email}</p>
                <p style="font-size: 16px;">Message: ${req.body.message}</p>`
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });
});