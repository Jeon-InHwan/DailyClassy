import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

// localhost:4000/users/:id/edit (GET)
export const getEdit = (req, res) => {
  return res.render("user/edit-profile.pug", { pageTitle: "Edit Profile" });
};

// localhost:4000/users/:id/edit (POST)
export const postEdit = async (req, res) => {
  const { _id, avatarUrl } = req.session.user;
  const { email, name, location } = req.body;
  const { file } = req;
  // check before update
  if (email !== req.session.user.email) {
    const emailExists = await User.exists({ email: email });
    if (emailExists) {
      return res.status(400).render("user/edit-profile", {
        pageTitle: "Edit Profile",
        errorMessage: "This email is already taken!",
      });
    }
  }
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      email: email,
      name: name,
      location: location,
      avatarUrl: file ? file.path : avatarUrl,
    },
    { new: true }
  );
  req.session.user = updatedUser;
  return res.redirect("/users/edit");
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
      socialLoginOnly: false,
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
  const user = await User.findOne({ ID: ID, socialLoginOnly: false });
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
  req.session.destroy();
  return res.redirect("/");
};

// localhost:4000/users/:id
export const profile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("posts");
  if (!user) {
    return res.status(404).render("404.pug", { pageTitle: "User Not Found!" });
  }
  console.log(user);
  return res.render("user/profile", {
    pageTitle: `${user.name}'Profile`,
    user: user,
  });
};

// localhost:4000/users/github/start (GET)
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

// localhost:4000/users/github/finish (GET)
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const data = await fetch(finalUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const json = await data.json();
  if ("access_token" in json) {
    // access the API
    const { access_token } = json;
    const apiUrl = "https://api.github.com";
    // get user data
    const userRequest = await fetch(`${apiUrl}/user`, {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });
    const userJson = await userRequest.json();
    // get user email
    const emailRequest = await fetch(`${apiUrl}/user/emails`, {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });
    const emailJson = await emailRequest.json();
    // find primary && verified email
    const emailObj = emailJson.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    // find local user with given email from github
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      // create an account based on github user information
      user = await User.create({
        email: emailObj.email,
        ID: userJson.name,
        password: "",
        name: userJson.login,
        location: userJson.location,
        socialLoginOnly: true,
        avatarUrl: userJson.avatar_url,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

// localhost:4000/users/change-password (GET)
export const getChangePassword = (req, res) => {
  if (req.session.user.socialLoginOnly === true) {
    return res.redirect("/");
  }
  return res.render("user/change-password", { pageTitle: "Change Password" });
};

// localhost:4000/users/change-password (POST)
export const postChangePassword = async (req, res) => {
  const { _id, password } = req.session.user;
  const { oldPassword, newPassword, newPasswordConfirmation } = req.body;
  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render("user/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The password does not match the confirmation!",
    });
  }
  const passwordValidation = await bcrypt.compare(oldPassword, password);
  if (!passwordValidation) {
    return res.status(400).render("user/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The current password is incorrect",
    });
  }
  const user = await User.findById(_id);
  user.password = newPassword;
  await user.save();
  req.session.user.password = user.password;
  return res.redirect("/users/logout");
};
