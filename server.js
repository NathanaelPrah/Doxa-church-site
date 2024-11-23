const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const PORT = 3000; // You can change this to any available port
app.use(express.json());

// Middleware
app.get("/", (req, res)=>{
  res.send("server is running!");
});
app.use(bodyParser.json());
app.use(cors());

// Contact form endpoint
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email provider
    auth: {
      user: "NathanaelPrah@gmail.com", // Replace with your email
      pass: "10Hope2001", // Replace with your email password or app password
    },
  });

  const mailOptions = {
    from: email,
    to: "NathanaelPrah@gmail.com@gmail.com", // Replace with the email where you want to receive messages
    subject: `Contact Form Submission from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
