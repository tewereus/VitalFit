const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const generateBarcode = () => {
  const timestampPart = Date.now().toString().slice(-8);
  const randomPart = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return timestampPart + randomPart;
};

const memberSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "full name is required"],
      set: (v) => v.trim().replace(/\s+/g, " "),
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already registered"],
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: () => `please input a valid email address`,
      },
    },
    mobile: {
      type: String,
      required: [true, "mobile is required"],
      unique: [true, "mobile number already registered"],
      validate: {
        validator: function (v) {
          return /^\d{9}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid mobile number`,
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      validate: {
        validator: function (v) {
          const hasUpper = /[A-Z]/.test(v);
          const hasLower = /[a-z]/.test(v);
          const hasNumber = /\d/.test(v);
          const hasSpecial = /[!@#$%^&*]/.test(v);
          return hasUpper && hasLower && hasNumber && hasSpecial;
        },
        message: () =>
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: "",
    },
    membershipType: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    trainer: {
      type: String,
    },
    accessLevel: {
      type: String,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    fitnessGoals: {
      type: String,
    },
    medicalConditions: {
      type: String,
    },
    membershipId: {
      type: String,
      required: [true, "membership id is required"],
      unique: [true, "membership id already exists"],
    },
    rfid: {
      type: String,
    },
    barcode: {
      type: String,
      unique: true,
      default: generateBarcode,
    },
    fingerprintId: {
      type: String,
    },
    lastLoginIp: {
      type: String,
    },
    lastLoginAt: {
      type: Date,
    },
    loginAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    lockUntil: {
      type: Date,
      default: null,
    },
    refreshToken: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  },
);

memberSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

memberSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

memberSchema.methods.createResetPasswordToken = async function () {
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.passwordResetExpires = new Date();
  this.passwordResetExpires.setMinutes(
    this.passwordResetExpires.getMinutes() + 10,
  );
  return resettoken;
};

module.exports = mongoose.model("Member", memberSchema);

