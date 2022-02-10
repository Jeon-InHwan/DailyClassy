import User from "../models/User";
import bcrypt from "bcrypt";

// localhost:4000/users/edit
export const edit = (req, res) => {
  console.log("I'm handleEdit");
  return res.send("<h1>Edit User</h1>");
};

// localhost:4000/join (GET)
export const getJoin = (req, res) => {
  return res.render("join.pug", { pageTitle: "Join" });
};

// localhost:4000/join (POST)
export const postJoin = async (req, res) => {
  const { email, ID, password, passwordConfirm, name, location } = req.body;
  if (password !== passwordConfirm) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Password confirmation does not match!",
    });
  }
  const idExists = await User.exists({ ID: ID });
  if (idExists) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "This ID is already taken!",
    });
  }
  const emailExists = await User.exists({ email: email });
  if (emailExists) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "This Email is already taken!",
    });
  }
  try {
    await User.create({
      email: email,
      ID: ID,
      name: name,
      password: password,
      location: location,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .render("join", { pageTitle: "Join", errorMessage: error._message });
  }

  return res.redirect("/login");
};

// localhost:4000/login (GET)
export const getLogin = (req, res) => {
  return res.render("login.pug", { pageTitle: "Login" });
};

// localhost:4000/login (POST)
export const postLogin = async (req, res) => {
  const { ID, password } = req.body;
  // confirm user existing
  const user = await User.findOne({ ID: ID });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "An account with this ID does not exists!",
    });
  }
  // compare user password
  const loginValidation = await bcrypt.compare(password, user.password);
  if (!loginValidation) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "Wrong Password!",
    });
  }
  // Save user data in session
  req.session.loggedIn = true;
  req.session.user = user;
  res.redirect("/");
};

// localhost:4000/users/logout
export const logout = (req, res) => {
  console.log("I'm handleLogout");
  return res.send("<h1>Logout</h1>");
};

// localhost:4000/users/:id
export const profile = (req, res) => {
  console.log("I'm handleProfile");
  return res.send("<h1>My profile</h1>");
};
