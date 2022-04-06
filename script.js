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
    // catches the previous return. It must be a .json()
    function returnResponse(data) {
        console.log(data.items);
        let i = 1
            ;
        for (item of data.items) {

          // Pour chaque élément du JSON:
            // Je génère une puce de la liste
            let listItem = document.createElement("li");
            listItem.classList.add("list_item");

            // Je génère un post
            let newPost = generatePost(item);
            
            // J'ajoute une image
            //let postImg = $("<img>").attr("src", "./img/" + i + ".jpg");
            let postImg = document.createElement("img");
            postImg.setAttribute("src", `./img/${i}.jpg`);

            listItem.appendChild(postImg);
            listItem.appendChild(newPost);
            list.appendChild(listItem);

            i++;
        }

   }
     );

/*
$(document).ready(function () { 
    const request = $.ajax({
        url: src,
        method: "GET",
        dataType:"json",
    }).done(function (response) {

        //J'ajoute une liste dans le contenu html
        let list = $("<ul>").addClass("list");
        $("#content").append(list);


        let i = 1
            ;
        for (item of response.items) {

          // Pour chaque élément du JSON:
            // Je génère une puce de la liste
            let listItem = $("<li>").addClass("list_item");

            // Je génère un post
            let newPost = generatePost(item);
            // J'ajoute une image
            let postImg = $("<img>").attr("src", "./img/" + i + ".jpg");
            
            listItem.append(postImg);
            listItem.append(newPost);
            list.append(listItem);

            i++;
        }
    }).fail(function(error){
        alert("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
    }).always(function(){
        console.log("Requête effectuée");
    });;
    

});
*/
