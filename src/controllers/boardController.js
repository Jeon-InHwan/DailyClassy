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
    pageTitle: `Watch ${board.title}`,
    fakeUser: fakeUser,
    board: board,
  });
};

// localhost:4000/boards/:id/edit
export const edit = (req, res) => {
  let board = boards[req.params.id - 1];

  return res.render("editBoard.pug", {
    pageTitle: `Edit ${board.title}`,
    fakeUser: fakeUser,
    board: board,
  });
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
