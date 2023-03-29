import userModel from "../models/users.js";
import otpModel from "../models/otp.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const fetchUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!!!" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userModel.findByIdAndDelete(id);
    const users = await userModel.find();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!!!" });
  }
};

export const signUp = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new userModel({
      email,
      password: String(hashedPassword),
      name,
    });
    await user.save();
    res.status(200).json({ msg: "Account created sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!!!" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  // const existingUser = await userModel.findOne({ email });
  // if (!existingUser) {
  //   return res.status(404).json({ msg: "Invalid Email" });
  // }
  const otpCode = Math.floor(Math.random() * 9000 + 1000);
  console.log("OTP CODE : ", otpCode);
  const otpData = new otpModel({ email, otpCode });
  await otpData.save();
  // await mailer(email, otpCode);
  res.status(200).json({ msg: "OTP has been sent to registered mail" });
  mailer(email, otpCode);
};

const mailer = async (email, otp) => {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    // port: 587,
    // secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "sending otp",
    html: "<h1>OTP sent sucessfully </h1>",
    // text: otp,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("ERROR: ", error);
    } else {
      console.log("Email Sent Successfully" + info.response);
      res.status(201).json({ status: 201, info });
    }
  });

  // let info = await transporter.sendMail({
  //   from: '"Girish Soni 👻" <girish.zxg@gmail.com>', // sender address
  //   to: email, // list of receivers
  //   subject: "OTP for change password - Asli Amazon", // Subject line
  //   text: otp, // plain text body
  //   html: "<b>Hello world?</b>", // html body
  // });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ msg: "User does not exist." });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Password is not valid." });
    }
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        name: existingUser.name,
      },
      "secretkey"
    );
    res.status(200).json({ data: existingUser, token });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!!!" });
  }
};
