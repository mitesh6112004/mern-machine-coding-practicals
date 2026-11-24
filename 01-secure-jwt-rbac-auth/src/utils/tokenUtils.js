import jwt from "jsonwebtoken";
import crypto from "crypto";
import config from "../config/config.js";

export const hashTokens = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const generateToken = (user) => {
  const accessToken = jwt.sign(
    {
      id: user._id,
      tokenVersion: user.tokenVersion,
      role: user.role,
    },
    config.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    },
  );

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    config.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return {accessToken, refreshToken};
};

export const verifyAccessToken = (token) => {
    return jwt.verify(token, config.ACCESS_TOKEN_SECRET);
}

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, config.REFRESH_TOKEN_SECRET);
}

export const cookieOptions = {
    httpOnly : true,
    secure : config.NODE_ENV === "production",
    sameSite: "strict",
    maxAge : 7 * 24 * 60 * 60 * 1000
}