// var express = require("express");
import express from "express";
// var passport = require('passport');
// var GoogleStrategy = require('passport-google-oidc');
import passport from "passport";
import GoogleStrategy from "passport-google-oidc";
import dotenv from "dotenv";
// import User from "../db/schema/User.js";
import User from "../db/Schema/UserSchema.js";
// import UserLog from "./UserLog/index.js";
dotenv.config({ path: "./.env" });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],

      callbackURL: "http://localhost:5173/login",
      scope: ["profile"],
    },
    // console.log("hai"),
    async (accessToken, refreshToken, profile, done) => {
      //   Check if user already exists in the database
      console.log("hai", profile.name);
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      //   Create new user if not exists
      const newUser = new User({
        googleId: profile.id,
        displayName: profile.displayName,
        // Add more fields as needed
      });

      await newUser.save();
      done(null, newUser);
    }
  )
);
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

const routerr = express.Router();

// router.use("/login", UserLog);
routerr.get("/login/federated/google", passport.authenticate("google"));
routerr.get(
  `http://localhost:5173/login`,
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/landing",
  })
);

export default routerr;
