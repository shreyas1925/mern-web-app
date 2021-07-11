const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

require("../db/conn");

const User = require("../models/Schema");

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please enter all the fields !! " });
  }

  try {
    const userexist = await User.findOne({ email: email });

    if (userexist) {
      return res.status(422).json({ error: "User already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password is not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//Login route

router.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return res.status(422).json({ error: "Please Enter the valid data" });
    }

    // Email data or database Data Fetching

    const userlogin = await User.findOne({ email: email });

    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);

      const token = await userlogin.generateAuthToken();

      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 2589788000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ message: "Invalid credentials " });
      } else {
        res.status(200).json({ message: "Signed in successfully" });
      }
    } else {
      res.status(400).json({ message: "Invalid credentials " });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      console.log(`please fill the complete form `);
      alert("please fill the complete form");
      return res.json({ error: "please fill the complete form " });
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(message);

      await userContact.save();

      res.status(201).json({ message: "user message saved sucessfully" });
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/logout", (req, res) => {
  console.log("Hello Logout Page");
  res.clearCookie("jwttoken", { path: "/" });
  res.status(200).send("User Logout");
});

module.exports = router;
