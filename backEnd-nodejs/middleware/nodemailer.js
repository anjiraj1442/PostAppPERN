// const nodemailer = require("nodemailer")
// require("dotenv").config;
// const sendEmail = option => {

//         var transport = nodemailer.createTransport({
//             host: process.env.EMAILHOST,
//             port: process.env.EMAILPORT,
//             auth: {
//                 user: process.env.EMAIL,
//                 pass: process.env.PASS

//             }
//         });
//         const mailOptions = {
//             from: 'Jonas Scheamtown<hello@jonas.io>',
//             to: option,

//         }
//         transport.sendMail(mailOptions, function (error, response) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log("Message sent: " + response);

//             }
//             transport.close(); // shut down the connection pool, no more messages
//         });


//     }


// const sendEmail = option => {
//     const transporter = nodemailer.createTransport({
//         host: process.env.EMAILHOST,
//         port: process.env.EMAILPORT,
//         auth: {
//             user: process.env.EMAIL,
//             pass: process.env.PASS

//         }
//     })

//     const mailOptions = {
//         from: 'Jonas Scheamtown<hello@jonas.io>',
//         to: option.email,
//         subject: option.subject,
//         text: option.message,
//     }
//     transporter.sendMail(mailOptions, function (error, response) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log("Message sent: " + response);

//         }
//         transporter.close(); // shut down the connection pool, no more messages
//     });

// }

//  module.exports = sendEmail

//  exports.sendEmail = (data) => {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASS
//       }
//     });


//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: data.Email,
//       subject: "Reset password Link",
//       html: `<h2>please click on this link to change the password</h2>

//                   `
//     };

//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err) {
//         return null;
//       } else {
//         const data = {

//           response: info.response
//         };
//         return data;
//       }
//     });
//   };


const nodemailer = require("nodemailer");
module.exports = {

  sendMail(toMail) {

    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'anjirajardula@gmail.com',
        pass: '9603811442'
      }
    });
    var mailOptions = {
      from: 'anjirajardula@gmail.com', // sender address
      to: toMail, // list of receivers
      subject: "Welcome! We're thrilled to have you with us", // Subject line
      text: "testing the mail", // plaintext body
      html: "htmlllllllllllll contentn to write"
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