export const trendingBoardForHome = (req, res) => {
  console.log("I'm trendingBoardForHome");
  return res.send("<h1>Trending Board in Home</h1>");
};

export const handleWatch = (req, res) => {
  console.log("I'm handleWatch");
  return res.send("<h1>Watch Board</h1>");
};

export const handleEdit = (req, res) => {
  console.log("I'm handleEdit");
  return res.send("<h1>Edit Board</h1>");
};
