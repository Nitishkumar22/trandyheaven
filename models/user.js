const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const userModel = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      require: [true, "First Name is required"],
      minLength: [4, "First name should be 4 char long"],
      maxLength: [8, "First name should not be more than  8 char long"],
    },
    lastname: {
      type: String,
      trim: true,
      require: [true, "Last Name is required"],
      minLength: [4, "Last name should be 4 char long"],
      maxLength: [8, "Last name should not be more than  8 char long"],
    },

    contact: {
      type: String,
      trim: true,
      // require: [true, "Contact is required"],
      minLength: [10, "Contact should be 10 digit long"],
      maxLength: [10, "Contact should be 10 digit long"],
    },
    gender: {
      type: String,
      enum: ["male", "Female", "Other"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      require: [true, "Email is"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      require:true,
      select: false,
      maxLength: [15, "Password should not exceed More than 15 characters"],
      //    minLength: [6, "Password should have atleast 6 characters"],
      //    match :[]
    },
    resetPasswordTooken: {
      type: String,
      default: "0",
    },
    avatar: {
      type: Object,
      default: {
        fileId: "",
        url: "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1956&q=80",
      },
    },
  },

  { timestamps: true }
);

userModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }

  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

userModel.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userModel.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const user = mongoose.model("user",userModel);

module.exports = user;
