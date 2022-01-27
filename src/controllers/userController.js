export const handleEdit = (req, res) => {
  console.log("I'm handleEdit");
  return res.send("<h1>Edit User</h1>");
};

export const handleJoin = (req, res) => {
  console.log("I'm handleJoin");
  return res.send("<h1>Join</h1>");
};

export const handleLogin = (req, res) => {
  console.log("I'm handleLogin");
  return res.send("<h1>Login</h1>");
};

export const handleLogout = (req, res) => {
  console.log("I'm handleLogout");
  return res.send("<h1>Logout</h1>");
};

export const handleProfile = (req, res) => {
  console.log("I'm handleProfile");
  return res.send("<h1>My profile</h1>");
};
