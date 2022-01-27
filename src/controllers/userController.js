export const handleEdit = (req, res) => {
  console.log("I'm handleEdit");
  return res.send("<h1>Edit User</h1>");
};

export const handleJoin = (req, res) => {
  console.log("I'm handleJoin");
  return res.send("<h1>Join</h1>");
};
