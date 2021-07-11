const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      message: {
        type: String,
        required: true,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let tokengetting = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: tokengetting });
    await this.save();
    return tokengetting;
  } catch (err) {
    console.log(err);
  }
};

userSchema.methods.addMessage = async function (message) {
  try {
    this.messages = this.messages.concat({ message }); //key value pair is same
    await this.save();
    return this.messages;
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("USER", userSchema);

module.exports = User;
