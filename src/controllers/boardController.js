export const trendingBoardForHome = (req, res) => {
  console.log("I'm trendingBoardForHome");
  return res.render("home.pug");
};

export const watch = (req, res) => {
  console.log(req.params);
  return res.render("watch.pug", { params: req.params.id });
};

export const edit = (req, res) => {
  console.log(req.params);
  return res.send(`<h1>Edit Board #${req.params.id}</h1>`);
};

export const upload = (req, res) => {
  console.log("I'm handleUpload");
  return res.send("<h1>Upload Board</h1>");
};

export const search = (req, res) => {
  console.log("I'm handleSearch");
  return res.send("<h1>Search Board</h1>");
};

export const deleteBoard = (req, res) => {
  console.log(req.params);
  return res.send(`<h1>Delete Board #${req.params.id}</h1>`);
};
