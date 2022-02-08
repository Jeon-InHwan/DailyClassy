import Post from "../models/Post";

// localhost:4000
export const home = async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.render("home.pug", { pageTitle: "Home", posts });
  } catch (error) {
    return res.render("404.pug", { error });
  }
};

// localhost:4000/posts/:id
export const watch = (req, res) => {
  return res.render("watch.pug", {
    pageTitle: `Watching:`,
  });
};

// localhost:4000/posts/:id/edit (GET)
export const getEdit = (req, res) => {
  return res.render("editPost.pug", {
    pageTitle: `Editing:`,
  });
};

// localhost:4000/posts/:id/edit (POST)
export const postEdit = (req, res) => {
  const { id } = req.params;
  const title = req.body.title;
  return res.redirect(`/posts/${id}`);
};

// localhost:4000/posts/upload (GET)
export const getUpload = (req, res) => {
  return res.render("upload.pug", {
    pageTitle: "Upload Post",
  });
};

// localhost:4000/posts/upload (POST)
export const postUpload = async (req, res) => {
  const { title, content, hashtags } = req.body;
  try {
    const post = new Post({
      title: title,
      content: content,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    const postFromDatabase = await post.save();
  } catch (error) {
    console.log(error);
    return res.render("upload.pug", {
      pageTitle: "Upload Post",
      errorMessage: error._message,
    });
  }

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
