let fakeUser = {
  username: "Nico",
  loggedIn: true,
};

let boards = [
  {
    id: 1,
    title: "First board",
    comments: 7,
    hitcounts: 14,
  },
  {
    id: 2,
    title: "Second board",
    comments: 5,
    hitcounts: 9,
  },
  {
    id: 3,
    title: "Third board",
    comments: 1,
    hitcounts: 5,
  },
];

// localhost:4000
export const trendingBoardForHome = (req, res) => {
  console.log("I'm trendingBoardForHome");
  return res.render("home.pug", {
    pageTitle: "Home",
    fakeUser: fakeUser,
    boards: boards,
  });
};

// localhost:4000/boards/:id
export const watch = (req, res) => {
  let board = boards[req.params.id - 1];

  return res.render("watch.pug", {
    pageTitle: `Watching: ${board.title}`,
    fakeUser: fakeUser,
    board: board,
  });
};

// localhost:4000/boards/:id/edit (GET)
export const getEdit = (req, res) => {
  let board = boards[req.params.id - 1];

  return res.render("editBoard.pug", {
    pageTitle: `Editing: ${board.title}`,
    fakeUser: fakeUser,
    board: board,
  });
};

// localhost:4000/boards/:id/edit (POST)
export const postEdit = (req, res) => {
  const { id } = req.params;
  const title = req.body.title;
  boards[id - 1].title = title;
  return res.redirect(`/boards/${id}`);
};

// localhost:4000/boards/upload
export const upload = (req, res) => {
  console.log("I'm handleUpload");
  return res.send("<h1>Upload Board</h1>");
};

// localhost:4000/search
export const search = (req, res) => {
  console.log("I'm handleSearch");
  return res.send("<h1>Search Board</h1>");
};

// localhost:4000/boards/:id/delete
export const deleteBoard = (req, res) => {
  console.log(req.params);
  return res.send(`<h1>Delete Board #${req.params.id}</h1>`);
};
