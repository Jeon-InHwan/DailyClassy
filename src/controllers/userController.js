import User from "../models/User";

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
  const { email, ID, password, name, location } = req.body;

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
    return res.redirect("/join");
  }

  return res.redirect("/login");
};

// localhost:4000/login
export const login = (req, res) => {
  console.log("I'm handleLogin");
  return res.send("<h1>Login</h1>");
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
