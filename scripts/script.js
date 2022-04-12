const src =
  "https://chroniclingamerica.loc.gov/search/titles/results/?terms=michigan&format=json&page=5";

// Placer le contenu du feed dans la vue
let content = document.getElementById("content");

// Le format de chaque article
class Article {
  constructor(newTitle, newDate, newAuthor, newImgURL, newContent) {
    (this.title = newTitle),
      (this.date = newDate),
      (this.author = newAuthor),
      (this.imgUrl = newImgURL),
      (this.content = newContent);
  }
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
  console.log("generatePostsList handles articleObject: ", articles);
  for (let i = 1; i < 10; i++) {
    // post content
    let newPostObject = cleanAPIData(articles.items[i], article);
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
document.getElementById("refresh_button").onclick = requestAPI;

function requestAPI() {
  // fetch().then() peut aussi s'écrire avec asynch().await()
  fetch(src)
    .then(function handleResponse(response) {
      console.log(response);
      // renvoie une promesse: pas encore un résultat
      if (!response.ok) {
        throw new Error(
          `Erreur ${response.status}: La requête à l' API a échoué.`
        );
      } else {
        // reponse est encore une promesse à ce stade
        console.log("réponse de l'api", response);
        return response.json();
      }
    })
    .then(
      (data) => {
        cleanAPIData(data, article);
      }
      // quand la promesse est tenue: récupère le retour du .then() précédent: doit être un .json()
      //console.log("When promise in resolved: ", response.json())
      //generatePostsList
    )
    .catch(function handleError(error) {
      let failMsg = document.createElement("h3");
      failMsg.innerText = `La requête s'est soldée par un échec : ${JSON.stringify(
        error
      )}`;
    });
}

// Remplir l'objet avec les données reçues de l'API
function cleanAPIData(data) {
  let article = {
    title: data.city[0],
  };
  console.log("cleanAPIData returns articleObject: ", data, articleObject);
  articleObject.title = data.city[0];
  articleObject.date = data.start_year;
  articleObject.author = data.publisher;
  articleObject.imgUrl = "";
  articleObject.content =
    "Article publié a " +
    data.city +
    ", en " +
    data.start_year +
    " par " +
    data.publisher +
    " " +
    data.note[0];

  return articleObject;
}

// Ajouter un article:
