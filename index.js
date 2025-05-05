import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
// app.use(cors());
app.use(
  cors({
    origin: process.env.CORS_PORT || "http://localhost:3000", 
    methods: ["GET", "POST","PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('Server');
});


  app.post('/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    
    // Configure nodemailer transporter (use your SMTP credentials here)
    const transporter = nodemailer.createTransport({
      host: 'gmail-smtp-in.l.google.com', 
      port: 587,
      service: 'gmail',
      secure: false,
      auth: {
        user: 'aryanhooda3522@gmail.com', 
        pass: 'disu cadk zzkm hzek', 
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
      const response = { message: 'Email sent successfully.' };
      console.log(JSON.stringify(response)); 
      res.json(response); 

    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email.' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  
  export default app;