const src =
  "https://chroniclingamerica.loc.gov/search/titles/results/?terms=michigan&format=json&page=5";
console.log(src);

// Placer le contenu du feed dans la vue
let content = document.getElementById("content");
let list = document.createElement("ul");
content.appendChild(list);

// Générer un post
function generatePost(article) {
  console.log(article);
  //balise <article>
  let post = document.createElement("article");
  post.classList.add("post");

  //<h3> : titre de l'article
  let postTitle = document.createElement("h3");
  postTitle.classList.add("post_title");
  postTitle.innerHTML = article.city[0];

  //<h4> : sous-titre : date et auteur
  let postYear = document.createElement("h4");
  postYear.classList.add("post_year");
  postYear.innerText = article.start_year + " - " + article.publisher;

  //<p> : le contenu de l'article
  let postContent = document.createElement("p");
  postContent.classList.add("post_content");
  postContent.innerText =
    "Article publié a " +
    article.city +
    ", en " +
    article.start_year +
    " par " +
    article.publisher +
    " " +
    article.note[0];
  // Le tout dans <article>
  post.appendChild(postTitle);
  post.appendChild(postYear);
  post.appendChild(postContent);
  return post;
}

// Générer une liste de posts (en intégrant les images)
function generatePostsList(articles) {
  for (let i = 1; i < 10; i++) {
    // <li> : Je génère une puce de la liste
    let listItem = document.createElement("li");
    listItem.classList.add("list_item");

    // Je génère un post
    let newPost = generatePost(articles.items[i]);

    // J'ajoute une image
    let postImg = document.createElement("img");
    postImg.setAttribute("src", `./img/${i}.jpg`);

    // Je lie le tout à la puce
    listItem.appendChild(postImg);
    listItem.appendChild(newPost);
    list.appendChild(listItem);
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
