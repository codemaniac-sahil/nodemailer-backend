const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const Agenda = require("agenda");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_CONNECTION_STRING =
  process.env.MONGODB_URL || "mongodb://127.0.0.1/agenda";

// Configure body-parser
app.use(bodyParser.json());

// Configure Agenda
const agenda = new Agenda({
  db: { address: MONGO_CONNECTION_STRING, collection: "agendaJobs" },
});

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.PASSWORD,
  },
});

// Define a job
agenda.define("send email", async (job) => {
  const { to, subject, text } = job.attrs.data;

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
});

// Schedule the email job
app.post("/schedule-email", async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).send("Missing required fields");
  }

  try {
    await agenda.schedule("in 1 minute", "send email", { to, subject, text });
    res.status(200).send("Email scheduled successfully");
  } catch (error) {
    res.status(500).send("Error scheduling email");
  }
});

// Start the server and agenda
(async function () {
  await agenda.start();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
