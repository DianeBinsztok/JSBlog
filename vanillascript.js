const src = "https://chroniclingamerica.loc.gov/search/titles/results/?terms=michigan&format=json&page=5";
console.log(src);


let content = document.getElementById("content");
let list = document.createElement("ul");
content.appendChild(list);

// Fonction pour générer un post
function generatePost(article) {
        //let post = $("<article>").addClass("post");   
    let post = document.createElement("article");
    post.classList.add("post");

        //let postTitle = $("<h3>").addClass("post_title").text(article.city[0]);
    let postTitle = document.createElement("h3");
    postTitle.classList.add("post_title");
    postTitle.innerHTML=article.city[0];

        //let postYear = $("<h4>").addClass("post_year").text("Published in: " + article.start_year);
    let postYear = document.createElement("h4");
    postYear.classList.add("post_year");
    postYear.innerHTML=article.start_year;
        
        //let postContent = $("<p>").addClass("post_content").text("Lorem ipsum blabla blablabla blabla blablabla");
    let postContent = document.createElement("p");
    postContent.classList.add("post_content");
    postContent.innerText = "Article publié a " +article.city + ", en " + article.start_year+ " par "+ article.publisher, "+ ", article.note[0];

    post.appendChild(postTitle);
    post.appendChild(postYear);
    post.appendChild(postContent);
    return post;
}

//Pour rafraichir le feed: requête à l'API:
document.getElementById("refresh_button").onclick = reload;
function reload() {
    // fetch().then() peut aussi s'écrire avec asynch().await()
    fetch(src).then(
     function handleResponse(response) {
         // renvoie une promesse: pas encore un résultat
            if (!response.ok) {
                throw new Error(`Erreur ${response.status}: La requête à l' API a échoué.`);
            } else {
                return response.json();
            }
        }  
    ).then(
        // récupère le retour du .then() précédent: doit être un .json()
        function returnResponse(data) {
            console.log(data.items);

            // pour parcourir le dossier img
            let i = 1;

            // pour chaque item reçu dans handleResponse()
                for (item of data.items) {

                // Pour chaque élément du JSON:
                    
                // Je génère une puce de la liste
                let listItem = document.createElement("li");
                listItem.classList.add("list_item");

                // Je génère un post
                let newPost = generatePost(item);
            
                // J'ajoute une image
                let postImg = document.createElement("img");
                postImg.setAttribute("src", `./img/${i}.jpg`);

                // Je lie le tout à la puce    
                listItem.appendChild(postImg);
                listItem.appendChild(newPost);
                list.appendChild(listItem);
                    
                    
                //Pour la photo suivante
                i++;
            }

        }
    ).catch(
        function handleError(error) {
            let failMsg = document.createElement("h3");
            failMsg.innerText = `La requête s'est soldée par un échec : ${JSON.stringify(error)}`;
        }
    );
}

