import session from "express-session";
import multer from "multer";

// Save session data in res.locals object
export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Daily Classy";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

// Login Interceptor Middelware
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

// Public Only Interceptor Middelware
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

// multer middleware
export const uploadMiddleware = multer({
  dest: "uploads/",
});
