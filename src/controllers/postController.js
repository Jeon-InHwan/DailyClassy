let fakeUser = {
  username: "Nico",
  loggedIn: true,
};

let posts = [
  {
    id: 1,
    title: "First post",
    comments: 7,
    hitcounts: 14,
  },
  {
    id: 2,
    title: "Second post",
    comments: 5,
    hitcounts: 9,
  },
  {
    id: 3,
    title: "Third post",
    comments: 1,
    hitcounts: 5,
  },
];

// localhost:4000
export const trendingPostForHome = (req, res) => {
  return res.render("home.pug", {
    pageTitle: "Home",
    fakeUser: fakeUser,
    posts: posts,
  });
};

// localhost:4000/posts/:id
export const watch = (req, res) => {
  let post = posts[req.params.id - 1];

  return res.render("watch.pug", {
    pageTitle: `Watching: ${post.title}`,
    fakeUser: fakeUser,
    post: post,
  });
};

// localhost:4000/posts/:id/edit (GET)
export const getEdit = (req, res) => {
  let post = posts[req.params.id - 1];

  return res.render("editPost.pug", {
    pageTitle: `Editing: ${post.title}`,
    fakeUser: fakeUser,
    post: post,
  });
};

// localhost:4000/posts/:id/edit (POST)
export const postEdit = (req, res) => {
  const { id } = req.params;
  const title = req.body.title;
  posts[id - 1].title = title;
  return res.redirect(`/posts/${id}`);
};

// localhost:4000/posts/upload (GET)
export const getUpload = (req, res) => {
  return res.render("upload.pug", {
    pageTitle: "Upload Post",
    fakeUser: fakeUser,
  });
};

// localhost:4000/posts/upload (POST)
export const postUpload = (req, res) => {
  console.log(req.body);
  const newPost = {
    title: req.body.title,
    comments: 0,
    hitcounts: 0,
    id: posts.length + 1,
  };
  posts.push(newPost);
  return res.redirect("/");
};

// localhost:4000/search
export const search = (req, res) => {
  console.log("I'm handleSearch");
  return res.send("<h1>Search Post</h1>");
};

// localhost:4000/posts/:id/delete
export const deletePost = (req, res) => {
  console.log(req.params);
  return res.send(`<h1>Delete post #${req.params.id}</h1>`);
};
