// routes/contact.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Create a transporter using Gmail SMTP
// Using environment variables for security
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'almasbabbitt@gmail.com',
    pass: process.env.EMAIL_PASSWORD, // This should be set in your .env file
  }
});

// Log email configuration status on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Server is ready to send email messages');
  }
});

// Contact form endpoint
router.post('/contact', async (req, res) => {
  try {
    const { fullName, email, message } = req.body;
    
    // Validate request data
    if (!fullName || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }
    
    // Email options
    const mailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER || 'almasbabbitt@gmail.com'}>`,
      to: process.env.EMAIL_USER || 'almasbabbitt@gmail.com', // Where to receive emails
      replyTo: email, // So you can reply directly to the sender
      subject: `New Contact Form Message from ${fullName}`,
      text: `
        Name: ${fullName}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Optional: Save contact message to MongoDB if you want a record
    /*
    const Contact = require('../models/contact');
    await new Contact({
      fullName,
      email,
      message,
      createdAt: new Date()
    }).save();
    */
    
    res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

module.exports = router;