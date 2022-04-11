const post = {
  title: "",
  date: "",
  author: "",
  imgUrl: "",
  content: "",
};

function generatePost() {
  // container .post_container

  //balise <article>
  let post = document.createElement("article");
  post.classList.add("post");

  //<h3> : titre de l'article
  let postTitle = document.createElement("h3");
  postTitle.classList.add("post_title");
  postTitle.innerHTML = articleObject.title;

  //<h4> : sous-titre : date et auteur
  let postSubtitle = document.createElement("h4");
  postSubtitle.classList.add("post_year");
  postSubtitle.innerText = articleObject.date + ", par " + articleObject.author;

  //<p> : le contenu de l'article
  let postContent = document.createElement("p");
  postContent.classList.add("post_content");
  postContent.innerText = articleObject.content;
  // Le tout dans <article>

  post.appendChild(postTitle);
  post.appendChild(postSubtitle);
  post.appendChild(postContent);

  return post;
}
