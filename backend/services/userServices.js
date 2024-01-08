const User = require("../models/userEntity");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("../utils/config");
const { Error } = require("mongoose");

const createUserService = async (data) => {
  try {
    const { firstName, lastName, email, password, role } = data;
    const user = new User({ firstName, lastName, email, password, role });
    return await user.save();
  } catch (err) {
    console.log('register', err)
    return { err: "Registration Failed" };
  }
};


const deleteUserService = async (email) => {
  try {
    return await User.findOneAndDelete({ email : email });
  } catch (err) {
    console.log("delete", err)
    return { err: "Error with Deleting Student" };
  }
};


const loginUserService = async (data) => {
  try {
    console.log('data', data)
    const findUser = await User.findOne({ email: data.email });
    if (!findUser) {
      console.log("User Not Found");
    } else {
      const checkPassword = await bcrypt.compare(
        data.password,
        findUser.password
      );
      if (!checkPassword) {
        console.log("Password Not Match");
      } else {
        return findUser;
      }
    }
  } catch (err) {
    console.log("login error", err)
    return { err: "Login Failed" };
  }
};

const createToken = (user) => {
  const secret = config.jwt_secret_key;
  const dataStoredInToken = {
    email: user.email,
    role: user.role,
  };
  return {
    newAccessToken: jwt.sign(dataStoredInToken, secret, { expiresIn: "1h" }),
    newRefreshToken: jwt.sign(dataStoredInToken, secret, {
      expiresIn: "24h",
    }),
    dataStoredInToken,
  };
};

const getLogedUserService= async(accToken)=> {
  try {
    const verifyAccToken = jwt.verify(accToken, config.jwt_secret_key);
    if (!verifyAccToken) {
      console.log('Unauthorized');
    } else {
      
      const userEmail = verifyAccToken.email;
      const findUser = await User.findOne({
        email: userEmail,
      });
      return findUser;
    }
  } catch (err) {
    console.log('Get User Error ', err);
    return { err: 'Cannot find User' };
  }
}

module.exports = { loginUserService, createToken, createUserService, deleteUserService, getLogedUserService};
