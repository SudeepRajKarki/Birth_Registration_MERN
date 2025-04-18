// test-nodemailer.js
const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Your email address
        pass: process.env.EMAIL_PASS,  // Your email password or app password
    },
});

// Email options
const mailOptions = {
    to: 'recipient-email@example.com',  // Replace with a valid recipient email
    subject: 'Test Email from Nodemailer',
    text: 'This is a test email sent using Nodemailer.',
};

// Send test email
transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.log('Error sending email:', err);
    } else {
        console.log('Email sent successfully:', info);
    }
});
