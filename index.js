const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.post('/',
//   console.log("Server")
// )
app.get('/', (req, res) => {
    console.log("Server")
  // res.json({ message: "Server" });
});

// POST /contact endpoint
app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Configure nodemailer transporter (use your SMTP credentials here)
  const transporter = nodemailer.createTransport({
    host: 'gmail-smtp-in.l.google.com', // Replace with your SMTP host
    port: 587,
    service: 'gmail',
    secure: false,
    auth: {
      user: 'aryanhooda3522@gmail.com', // Replace with your SMTP username
      pass: 'disu cadk zzkm hzek', // Replace with your SMTP password
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'aryanhooda3522@gmail.com',
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
