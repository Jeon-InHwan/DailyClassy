const postContainer = document.getElementById("postContainer");

$(document).ready(function () {
  $(".picContainer").slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "linear",
    centerMode: true,
  });

  // Request View API when page is loaded
  const { id } = postContainer.dataset;
  fetch(`/api/posts/${id}/view`, {
    method: "POST",
  });
});
