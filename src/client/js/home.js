const div = document.querySelector(".post-grid");
const moreBtn = document.querySelector(".moreBtn");
let count = 1;

doInfiniteScrolling = async () => {
  count = count + 1;
  const response = await fetch(`/api/posts/more?page=${count}`, {
    method: "GET",
  });
  const json = await response.json();
  json.docs.forEach((post) => {
    const newAnchor = document.createElement("a");
    newAnchor.className = "post-mixin";
    newAnchor.href = `/posts/${post._id}`;
    const newThumbDiv = document.createElement("div");
    newThumbDiv.className = "post-mixin__thumb";
    newThumbDiv.style = `background-image: url(/${post.pics[0]}); background-size: cover; background-position: center;`;
    const newDataDiv = document.createElement("div");
    newDataDiv.className = "post-mixin__data";
    newAnchor.append(newThumbDiv);
    const newTitleSpan = document.createElement("span");
    newTitleSpan.className = "post-mixin__title";
    newTitleSpan.innerText = post.title;
    newDataDiv.append(newTitleSpan);
    const newMetaDiv = document.createElement("div");
    newMetaDiv.className = "post-mixin__meta";
    const newOwnerSpan = document.createElement("span");
    newOwnerSpan.innerText = post.owner.name + " ㆍ ";
    const newViewsSpan = document.createElement("span");
    newViewsSpan.innerText =
      post.meta.views > 1
        ? post.meta.views + " views"
        : post.meta.views + " view";
    newMetaDiv.append(newOwnerSpan);
    newMetaDiv.append(newViewsSpan);
    newDataDiv.append(newMetaDiv);
    post.hashtags.forEach((hashtag) => {
      const newHashtagSpan = document.createElement("span");
      newHashtagSpan.className = "post-mixin__hashtag";
      newHashtagSpan.innerText = `${hashtag}` + " ";
      newDataDiv.append(newHashtagSpan);
    });
    const newSmallDiv = document.createElement("div");
    newSmallDiv.className = "post-mixin__small";
    const newSmall = document.createElement("small");
    newSmall.innerText = post.createdAt;
    newSmallDiv.append(newSmall);
    newDataDiv.append(newSmallDiv);
    newAnchor.append(newDataDiv);
    div.append(newAnchor);
  });
};

moreBtn.addEventListener("click", () => {
  doInfiniteScrolling();
});

$(window).scroll(function () {
  let scrolltop = $(window).scrollTop();
  let height = $(document).height();
  let height_win = $(window).height();
  if (Math.round(scrolltop == height - height_win)) {
    doInfiniteScrolling();
  }
  let directionFlag = false;
  $(window).bind("mousewheel", function (event) {
    if (event.originalEvent.wheelDelta >= 0) {
      directionFlag = true;
    } else {
      directionFlag = false;
    }
  });
  if (directionFlag) {
    count = count - 1;
  }
});
