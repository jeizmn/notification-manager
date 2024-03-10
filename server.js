const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sendEmail = require('./notificationService');

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit', async (req, res) => {
    try {
        const formData = req.body;
        console.log(formData.email, "reg success");

        // Send email
        const emailResult = await sendEmail(formData);

        res.status(200).json({ message: 'Email Notification sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error occurred during email sending.' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
