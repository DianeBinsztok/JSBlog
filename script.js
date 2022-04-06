$(document).ready(function () { 
    const src = "https://chroniclingamerica.loc.gov/search/titles/results/?terms=michigan&format=json&page=5";
    console.log(src);

   
   // Pour rafraichir le feed:
    function reload() {

        // requête à l'API
        const request = $.ajax({
            url: src,
            method: "GET",
            dataType:"json",
        }).done(function (response) {
    
            //J'ajoute une liste dans le contenu html
            let list = $("<ul>").addClass("list");
            $("#content").append(list);
    
    
            let i = 1;
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
        }).fail(function (error) {
            let failMsg = $("<h3").text("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
            $("content").failMsg;
        }).always(function(){
            console.log("Requête effectuée");
        });;
    }


    // Fonction pour générer un post
    function generatePost(article) {
        let post = $("<article>").addClass("post");    
        let postTitle = $("<h3>").addClass("post_title").text(article.city[0]);
        let postYear = $("<h4>").addClass("post_year").text("Published in: " + article.start_year);
        let postContent = $("<p>").addClass("post_content").text("Article publié a " +article.city + ", en " + article.start_year+ " par "+ article.publisher, "+ ", article.note[0]);
       
        post.append(postTitle, postTitle, postYear, postContent);
        return post[0];
    } 

    $('#refresh_button').click(function(){reload()});

  
});

