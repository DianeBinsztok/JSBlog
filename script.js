const src = "https://chroniclingamerica.loc.gov/search/titles/results/?terms=michigan&format=json&page=5";
console.log(src);

// Fonction pour générer un post
function generatePost(article) {
        //let post = $("<article>").addClass("post");   
    let post = document.createElement("article");
    post.classList.add("post");


        //let postTitle = $("<h3>").addClass("post_title").text(article.city[0]);
    let postTitle = document.createElement("h3");
    postTitle.classList.add("post_title");
    postTitle.innerHTML(article.city[0]);

        //let postYear = $("<h4>").addClass("post_year").text("Published in: " + article.start_year);
    let postYear = document.createElement("h4");
    postYear.classList.add("post_year");
        

        //let postContent = $("<p>").addClass("post_content").text("Lorem ipsum blabla blablabla blabla blablabla");
    let postContent = document.createElement("p");
    postContent.classList.add("post_content");

    post.appendChild(postTitle, postYear, postContent);
     
    return post;
}

fetch(src).then(
    function handleResponse(response) {
        console.log("1 - I handle API's response: ", response);
        // renvoie une promesse: pas encore un résultat
        if (!response.ok) {
            console.log("2 - if error", response);
            throw new Error(`Erreur ${response.status}: La requête à l' API a échoué.`);
        } else {
            console.log("3 - If success:", response);
            return response.json();
        }
    }  
).then(
    // catches the return. It must be a .json()
    function returnResponse(data) {
        console.log("4 - Returns an object: ", data);
        console.log("e.g.:",data.items[0].place_of_publication);
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
