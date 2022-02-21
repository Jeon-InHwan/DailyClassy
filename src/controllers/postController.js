import Post from "../models/Post";
import User from "../models/User";

// localhost:4000
export const home = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: "desc" });
    return res.render("home.pug", { pageTitle: "Home", posts });
  } catch (error) {
    return res.render("404.pug", { error });
  }
};

// localhost:4000/posts/:id
export const watch = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("owner");

  if (!post) {
    return res.status(404).render("404.pug", { pageTitle: "Post Not Found!" });
  }

  console.log(post);

  return res.render("watch.pug", {
    pageTitle: post.title,
    post: post,
  });
};

// localhost:4000/posts/:id/edit (GET)
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).render("404.pug", { pageTitle: "Post Not Found!" });
  }

  if (String(post.owner) !== req.session.user._id) {
    return res.status(403).redirect("/");
  }

  return res.render("post/editPost.pug", {
    pageTitle: `Edit 「${post.title}」`,
    post: post,
  });
};

// localhost:4000/posts/:id/edit (POST)
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, content, hashtags } = req.body;
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).render("404.pug", { pageTitle: "Post Not Found!" });
  }
  if (String(post.owner) !== req.session.user._id) {
    return res.status(403).redirect("/");
  }
  await Post.findByIdAndUpdate(id, {
    title: title,
    content: content,
    hashtags: Post.formatHashtags(hashtags),
  });
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
  const { _id } = req.session.user;
  const { title, content, hashtags } = req.body;
  const { files } = req;

  if (files.length > 5) {
    return res.status(400).render("upload.pug", {
      pageTitle: "Upload Post",
      errorMessage: "Too many pictures",
    });
  }

  try {
    const newPost = await Post.create({
      title: title,
      content: content,
      hashtags: Post.formatHashtags(hashtags),
      pics: files.map((file) => file.path),
      owner: _id,
    });
    console.log(newPost);
    const user = await User.findById(_id);
    console.log(user);
    user.posts.push(newPost._id);
    await user.save();
    console.log(user);
  } catch (error) {
    console.log(error);
    return res.status(400).render("upload.pug", {
      pageTitle: "Upload Post",
      errorMessage: error._message,
    });
  }

  return res.redirect("/");
};

// localhost:4000/search (GET)
export const search = async (req, res) => {
  const { keyword } = req.query;
  let posts = [];
  if (keyword) {
    // search
    posts = await Post.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    });
  }
  return res.render("search.pug", { pageTitle: "Search", posts: posts });
};

// localhost:4000/posts/:id/delete
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).render("404.pug", { pageTitle: "Post Not Found!" });
  }
  if (String(post.owner) !== req.session.user._id) {
    return res.status(403).redirect("/");
  }
  // delete post
  await Post.findByIdAndDelete(id);
  return res.redirect("/");
};
