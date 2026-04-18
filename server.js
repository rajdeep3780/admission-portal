
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
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running...");
});
const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";
app.get("/login", (req, res) => {
  res.send(`
    <h2>Admin Login</h2>
    <form method="POST" action="/login">
      <input name="username" placeholder="Username" required/>
      <input name="password" type="password" placeholder="Password" required/>
      <button>Login</button>
    </form>
  `);
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.redirect("/admin");
  } else {
    res.send("Wrong credentials ❌");
  }
});
let students = [];
students.push({ name, email, course });
app.get("/admin", (req, res) => {
  let html = "<h2>All Admissions</h2>";

  students.forEach(s => {
    html += `<p>${s.name} - ${s.email} - ${s.course}</p>`;
  });

  res.send(html);
});
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "YOUR_KEY",
  key_secret: "YOUR_SECRET"
});
app.get("/pay", async (req, res) => {
  const order = await razorpay.orders.create({
    amount: 50000, // ₹500
    currency: "INR"
  });

  res.json(order);
});