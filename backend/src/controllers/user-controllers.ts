import { NextFunction, Request, Response } from "express";
import user from "../models/user.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get all users
    const Users = await user.find();
    return res.status(200).json({ message: "OK", Users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user signup
    const { name, email, password } = req.body;
    const existingUser = await user.findOne({ email });
    if (existingUser) return res.status(401).send("User already registered");
    const hashedPassword = await hash(password, 10);
    const User = new user({ name, email, password: hashedPassword });
    await User.save();

    // create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "https://ai-chatbot-mern-backend.onrender.com",
      signed: true,
      path: "/",
      secure: true,
      sameSite: "none",
    });

    const token = createToken(User._id.toString(), User.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "https://ai-chatbot-mern-backend.onrender.com",
      expires,
      httpOnly: true,
      signed: true,
      secure: true,
      sameSite: "none",
    });

    return res
      .status(201)
      .json({ message: "OK", name: User.name, email: User.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user login
    const { email, password } = req.body;
    const User = await user.findOne({ email });
    if (!User) {
      return res.status(401).send("User not registered");
    }
    const isPasswordCorrect = await compare(password, User.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }

    // create token and store cookie

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "https://ai-chatbot-mern-backend.onrender.com",
      signed: true,
      path: "/",
      secure: true,
      sameSite: "none",
    });

    const token = createToken(User._id.toString(), User.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "https://ai-chatbot-mern-backend.onrender.com",
      expires,
      httpOnly: true,
      signed: true,
      secure: true,
      sameSite: "none",
    });

    return res
      .status(200)
      .json({ message: "OK", name: User.name, email: User.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const User = await user.findById(res.locals.jwtData.id);
    if (!User) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (User._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({ message: "OK", name: User.name, email: User.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const User = await user.findById(res.locals.jwtData.id);
    if (!User) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (User._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "https://ai-chatbot-mern-backend.onrender.com",
      signed: true,
      path: "/",
      secure: true,
      sameSite: "none",
    });

    return res
      .status(200)
      .json({ message: "OK", name: User.name, email: User.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
