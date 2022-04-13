// On click on the "publish" button:
document.getElementById("publish_btn").onclick = controlNewPost;

function controlNewPost() {
  // message d'erreur:
  let errorMsg = document.getElementById("error_message");
  let errorText = document.getElementById("error_text");

  // date :
  let today = new Date();
  let date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  // nouvel objet de post
  let newPost = {
    title: "",
    date: date,
    author: "",
    imgUrl: "",
    content: "",
  };

  // 1 - Fonction de contrôle d'un input:

  function inputControl(target, targetName) {
    if (target.checkValidity() == false) {
      errorText.innerText = `Your ${targetName} is missing or invalid`;
      errorMsg.classList.remove("hidden");
    } else {
      console.log(target.value);
      return target.value;
    }
  }

  // 2 - Appliquer le contrôle sur chaque input

  let title = document.getElementById("new_title");
  newPost.title = inputControl(title, "title");
  let name = document.getElementById("new_author");
  newPost.author = inputControl(name, "name");
  let imgUrl = document.getElementById("new_image");
  newPost.imgUrl = inputControl(imgUrl, "image Url");
  let content = document.getElementById("new_content");
  newPost.content = inputControl(content, "content");

  // 3 - Si tous les inputs sont valides, générer un post et l'afficher

  if (errorMsg.className == "hidden") {
    let vueContent = document.getElementById("content");
    vueContent.prepend(generatePost(newPost));
  }

  /* tests plus avancés
  let title = document.getElementById("new_title");

  if (title == "" || title == " ") {
    console.log("title value is empty");
    console.log(postObject.title);
  } else if (title === null) {
    console.log("title value is null");
  } else if (typeof title == "undefined") {
    console.log("title value is undefined");
  } else {
    newPost.title = title;
  }
  */
}
