// localhost:4000/users/edit
export const edit = (req, res) => {
  console.log("I'm handleEdit");
  return res.send("<h1>Edit User</h1>");
};

// localhost:4000/join
export const join = (req, res) => {
  console.log("I'm handleJoin");
  return res.send("<h1>Join</h1>");
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
