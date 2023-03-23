import userModel from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
