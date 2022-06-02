const nodemailer = require("nodemailer")
module.exports = {

     sendMail(toMail) {

         var transport = nodemailer.createTransport({
             service: "gmail",
             auth: {
                 user: 'anjirajardula@gmail.com',
                 pass: ''
             }
         });
         var mailOptions = {
             from: 'anjirajardula@gmail.com', // sender address
             to: toMail, // list of receivers
             subject: "Reset password request", // Subject line
             text: "hi, this is link for reset password", // plaintext body
             html: `<div class="reset_password">
             <p>Hi!</p>
             <p>Here is the link to reset password: <a href=""> click here</a></p>
             <p>Thanks</p>
             </div>`
         }

         transport.sendMail(mailOptions, function (error, response) {
             if (error) {
                 console.log(error);
             } else {
                 console.log("Message sent: " + response);

             }
             transport.close(); // shut down the connection pool, no more messages
         });
     }
 } 