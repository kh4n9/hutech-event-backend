const jwt = require("jsonwebtoken");
const app = require("express");
const Role = require("../models/Role");
const User = require("../models/User");

// middleware check token in localstorage to login limit time 1 hour
const verifyToken = (req, res, next) => {
  try {
    const header = req.header("authorization");
    const token = header && header.split(" ")[1];
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

// middleware check token and role from token then find user by id and check role of user is admin or not
const verifyAdmin = async (req, res, next) => {
  try {
    const header = req.header("authorization");
    const token = header && header.split(" ")[1];
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(verified._id);
    const role = await Role.findById(user.roleId);
    if (role.name === "admin") {
      next();
    } else {
      res.status(401).send("Access Denied");
    }
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = { verifyToken, verifyAdmin };
