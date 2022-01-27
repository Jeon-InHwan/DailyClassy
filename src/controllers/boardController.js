export const trendingBoardForHome = (req, res) => {
  console.log("I'm trendingBoardForHome");
  return res.send("<h1>Trending Board in Home</h1>");
};

export const handleWatch = (req, res) => {
  console.log(req.params);
  return res.send(`<h1>Watch Board #${req.params.id}</h1>`);
};

export const handleEdit = (req, res) => {
  console.log(req.params);
  return res.send(`<h1>Edit Board #${req.params.id}</h1>`);
};

export const handleUpload = (req, res) => {
  console.log("I'm handleUpload");
  return res.send("<h1>Upload Board</h1>");
};

export const handleSearch = (req, res) => {
  console.log("I'm handleSearch");
  return res.send("<h1>Search Board</h1>");
};

export const handleDelete = (req, res) => {
  console.log(req.params);
  return res.send(`<h1>Delete Board #${req.params.id}</h1>`);
};
