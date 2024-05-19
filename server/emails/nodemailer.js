const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

async function sendMail(email) {
    if(!email) return res.status(500).json({ error: 'Internal Server Error' });
    let mailOptions = {
        from: '"Monforte Dental Clinic" <info@monfortedentalclinic.com>',
        to: 'user_recipient@example.com',
        subject: 'Schedule Notification',
        text: 'Hi [Username], just a reminder that you have an appointment scheduled with us on [Date] at [Time]. Please let us know if you need to reschedule.',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Appointment Reminder</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                h1 {
                    color: #333;
                }
                p {
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <h1>Hi [Username],</h1>
            <p>Just a reminder that you have an appointment scheduled with us on [Date] at [Time].</p>
            <p>Please let us know if you need to reschedule.</p>
            <p>Best regards,</p>
            <p>Monforte Dental Clinic</p>
        </body>
        </html>
        `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendMail
}