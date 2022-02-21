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

// multer middleware for avatar
export const avatarUploadMiddleware = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 30000000,
  },
});

// multer middleware for picture
export const pictureUploadMiddleware = multer({
  dest: "uploads/pictures/",
  limits: {
    fileSize: 200000000,
  },
});
