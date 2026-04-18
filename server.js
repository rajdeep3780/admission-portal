const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Form submit
app.post("/submit", (req, res) => {
  const { name, email, course } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rajdeep3780@gmail.com",
      pass: "zpet vond tojo igrs"
    }
  });

  let mailOptions = {
    from: "your_email@gmail.com",
    to: "rajdeep3780l@gmail.com",
    subject: "New Admission Form",
    text: `Name: ${name}\nEmail: ${email}\nCourse: ${course}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.send("Error sending email ❌");
    }
    res.send("Form submitted successfully ✅");
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});