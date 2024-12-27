const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const schedule = require("node-schedule");
const nodemailer = require("nodemailer");
const dayjs = require("dayjs");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes");
const Event = require("./models/Event");
const EventRegistration = require("./models/EventRegistration");
const Student = require("./models/Student");

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.listen(port, () => {
  console.log(`HutechEventBE listening on port ${port}`);
});

try {
  mongoose.connect(process.env.MONGO_URL, {});
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send email
const sendEmail = async (student, event, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: student.email,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${student.email}:`, info.response);
  } catch (error) {
    console.log(`Error sending email to ${student.email}:`, error);
  }
};

// Schedule emails for events
const scheduleEmailsForEvents = async () => {
  const now = dayjs(); // Lấy thời gian hiện tại
  const next24h = now.add(24, "hour").toDate(); // Thời gian 24 giờ tới
  const next1h = now.add(1, "hour").toDate(); // Thời gian 1 giờ tới

  // Events within the next 24 hours
  const events24h = await Event.find({
    date: { $lte: next24h, $gte: now.toDate() },
  });

  events24h.forEach(async (event) => {
    const registrations = await EventRegistration.find({
      eventId: event._id,
    });
    for (const registration of registrations) {
      const student = await Student.findById(registration.studentId);
      if (student && !registration.reminder24hSent) {
        const subject = `Reminder: Upcoming Event ${event.name}`;
        const text = `Chào ${student.fullname},\n\nSự kiện "${
          event.name
        }" sẽ bắt đầu vào lúc ${dayjs(event.date).format(
          "HH:mm:ss ngày DD/MM/YYYY"
        )} tại ${
          event.location
        } vui lòng có mặt đúng giờ để tham gia sự kiện .\n\nBest regards,\nHutech Event Team`;
        await sendEmail(student, event, subject, text);
        registration.reminder24hSent = true;
        await registration.save();
      }
    }
  });

  // Events within the next 1 hour
  const events1h = await Event.find({
    date: { $lte: next1h, $gte: now.toDate() },
  });

  events1h.forEach(async (event) => {
    const registrations = await EventRegistration.find({
      eventId: event._id,
    });
    for (const registration of registrations) {
      const student = await Student.findById(registration.studentId);
      if (student && !registration.reminder1hSent) {
        const subject = `Reminder: Upcoming Event ${event.name}`;
        const text = `Chào ${student.fullname},\n\nSự kiện "${
          event.name
        }" sẽ bắt đầu vào lúc ${dayjs(event.date).format(
          "HH:mm:ss ngày DD/MM/YYYY"
        )} tại ${
          event.location
        } vui lòng có mặt đúng giờ để tham gia sự kiện .\n\nBest regards,\nHutech Event Team`;
        await sendEmail(student, event, subject, text);
        registration.reminder1hSent = true;
        await registration.save();
      }
    }
  });
};

// Call the scheduling function every 10 seconds
setInterval(scheduleEmailsForEvents, 10000);

scheduleEmailsForEvents();
