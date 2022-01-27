export const edit = (req, res) => {
  console.log("I'm handleEdit");
  return res.send("<h1>Edit User</h1>");
};

export const join = (req, res) => {
  console.log("I'm handleJoin");
  return res.send("<h1>Join</h1>");
};

export const login = (req, res) => {
  console.log("I'm handleLogin");
  return res.send("<h1>Login</h1>");
};

export const logout = (req, res) => {
  console.log("I'm handleLogout");
  return res.send("<h1>Logout</h1>");
};

export const profile = (req, res) => {
  console.log("I'm handleProfile");
  return res.send("<h1>My profile</h1>");
};
