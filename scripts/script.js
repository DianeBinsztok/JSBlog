const src =
  "https://chroniclingamerica.loc.gov/search/titles/results/?terms=michigan&format=json&page=5";

// Placer le contenu du feed dans la vue
let content = document.getElementById("content");

// Récupérer data ds un objet
function cleanAPIData(data) {
  const article = {
    title: data.city[0],
    date: data.start_year,
    author: data.publisher,
    imgUrl: "",
    content:
      "Article publié a " +
      data.city +
      ", en " +
      data.start_year +
      " par " +
      data.publisher +
      " " +
      data.note[0],
  };
  return article;
}

// Générer un post
function generatePost(articleObject) {
  //balise <article>
  let post = document.createElement("article");
  post.classList.add("post_container");

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

// Générer une liste de posts (en intégrant les images)
function generatePostsList(articles) {
  for (let i = 1; i < 10; i++) {
    // post content
    let newPostObject = cleanAPIData(articles.items[i]);
    let newPost = generatePost(newPostObject);
    //newPost.classList.add("post_content");

    // J'ajoute une image
    let postImg = document.createElement("img");
    postImg.setAttribute("src", `./img/${i}.jpg`);

    newPost.prepend(postImg);
    // postItem.appendChild(newPost);
    let vueContent = document.getElementById("content");
    vueContent.prepend(newPost);
  }
}

// Pour rafraichir le feed: requête à l'API:
document.getElementById("refresh_button").onclick = reload;
function reload() {
  // fetch().then() peut aussi s'écrire avec asynch().await()
  fetch(src)
    .then(function handleResponse(response) {
      // renvoie une promesse: pas encore un résultat
      if (!response.ok) {
        throw new Error(
          `Erreur ${response.status}: La requête à l' API a échoué.`
        );
      } else {
        return response.json();
      }
    })
    .then(
      // récupère le retour du .then() précédent: doit être un .json()
      generatePostsList
    )
    .catch(function handleError(error) {
      let failMsg = document.createElement("h3");
      failMsg.innerText = `La requête s'est soldée par un échec : ${JSON.stringify(
        error
      )}`;
    });
}

// Ajouter un article:
