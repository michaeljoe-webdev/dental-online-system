const { MailtrapClient } = require("mailtrap");
const client = new MailtrapClient({ endpoint: process.env.MAILTRAP_ENDPOINT, token: process.env.MAILTRAP_TOKEN });

async function sendMail(email) {    
    if(!email) return res.status(500).json({ error: 'Internal Server Error' });
    const sender = {
        email: "info@monfortedentalclinic.com",
        name: "Monforte Dental Clinic",
    };
    const recipients = [
        {
            email: 'user_recipient@example.com',
        }
    ];

    try {
        client.send({
            from: sender,
            to: recipients,
            subject: 'Schedule Notification',
            text: 'Hi [Username], just a reminder that you have an appointment scheduled with us on [Date] at [Time]. Please let us know if you need to reschedule.',
            category: "Monforte Dental Clinic",
        })
    }   catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }   
}

module.exports = {
    sendMail
}