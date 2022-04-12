// On click on the "publish" button:
document.getElementById("publish_btn").onclick = controlNewPost;

function controlNewPost() {
  // message d'erreur:
  let errorMsg = document.getElementById("error_message");

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

  // title :
  let title = document.getElementById("new_title");
  // title control:
  if (title.checkValidity() == false) {
    errorMsg.innerText = "😕   Your title is missing or invalid";
    errorMsg.classList.remove("hidden");
  } else {
    newPost.title = title.value;
  }

  // name :
  let name = document.getElementById("new_author");
  // name control:
  if (name.checkValidity() == false) {
    errorMsg.innerText = "😕   Your name is missing or invalid";
    errorMsg.classList.remove("hidden");
  } else {
    newPost.author = name.value;
  }

  // image's URL:
  let imgUrl = document.getElementById("new_image");
  // imgUrl control:
  if (imgUrl.checkValidity() == false) {
    errorMsg.innerText = "😕   Your image URL is missing or invalid";
    errorMsg.classList.remove("hidden");
  } else {
    newPost.imgUrl = imgUrl.value;
  }

  // content :
  let content = document.getElementById("new_content");
  // content control:
  if (content.checkValidity() == false) {
    errorMsg.innerText = "😕   Your content is missing or invalid";
    errorMsg.classList.remove("hidden");
  } else {
    newPost.content = content.value;
  }

  if (
    name.checkValidity() &&
    title.checkValidity() &&
    imgUrl.checkValidity() &&
    content.checkValidity()
  ) {
    errorMsg.classList.add("hidden");
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
