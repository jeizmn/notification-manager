const nodemailer = require('nodemailer');

function sendEmail(formData) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'examplemailid@mail.com', // Your email
                pass: '****************' // Your email password
            }
        });

        const registrationMailOptions = {
            from: 'jeesmonshaju6@gmail.com',
            to: formData.email,
            subject: 'Successful Registration',
            html: `<h4>Hi ${formData.name},</h4>
                   <h3>Thank you for registering. We will get back to you soon!!<h3>`
        };

        const confirmationMailOptions = {
            from: 'jeesmonshaju6@gmail.com',
            to: 'jeesmonshaju6@gmail.com',
            subject: 'One User Successfully Registered',
            html: `<b>User Details!!</b>
                  <p>Name: ${formData.name}</p>
                  <p>Company: ${formData.company}</p>
                  <p>Email: ${formData.email}</p>
                  <p>Phone: ${formData.phone}</p>
                  <p>Message: ${formData.message}</p>`
        };

        transporter.sendMail(registrationMailOptions, (error, registrationInfo) => {
            if (error) {
                console.error(error);
                reject('Error sending registration email');
            } else {
                console.log('Registration Email sent: ' + registrationInfo.response);
                transporter.sendMail(confirmationMailOptions, (error, confirmationInfo) => {
                    if (error) {
                        console.error(error);
                        reject('Error sending confirmation email');
                    } else {
                        console.log('Confirmation Email sent: ' + confirmationInfo.response);
                        resolve('Emails sent successfully');
                    }
                });
            }
        });
    });
}

module.exports = sendEmail;
