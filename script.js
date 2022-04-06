$(document).ready(function () { 
    const src = "https://chroniclingamerica.loc.gov/search/titles/results/?terms=michigan&format=json&page=5";
    console.log(src);

    // Fonction pour générer un post
    function generatePost(article) {
        let post = $("<article>").addClass("post");    
        let postTitle = $("<h3>").addClass("post_title").text(article.city[0]);
        let postYear = $("<h4>").addClass("post_year").text("Published in: " + article.start_year);
        let postContent = $("<p>").addClass("post_content").text("Lorem ipsum blabla blablabla blabla blablabla");
       
        post.append(postTitle, postTitle, postYear, postContent);
        console.log(post[0]);
        return post[0];
    } 

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
    

    /*
    // 2e essai:
     const test = 'https://en.wikiquote.org/w/api.php?action=parse&format=json&page=Bruce%20Lee';
    //console.log(test);
    const requestTest = $.ajax({
        url: test,
        method: "GET",
        dataType:"json",
    }).done(function (response) {
        console.log(response.parse.text);
        document.getElementById("content").append(response.parse.title);
        const data = response.parse.text;
        document.getElementById("content").append(response.parse.text["*"]);
    });
    */
});
