// On click on the "publish" button:
document.getElementById("publish_btn").onclick = handleNewPost;

function handleNewPost() {
  // title :
  let title = document.getElementById("new_title");
  console.log(title.value);

  // date :
  let today = new Date();
  let date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  console.log(date);

  // name :
  let name = document.getElementById("new_author");
  console.log(name.value);

  // image's URL:
  let imgUrl = document.getElementById("new_image");
  console.log(imgUrl.value);

  // content :
  let content = document.getElementById("new_content");
  console.log(content.value);

  let newPost = {
    title: title.value,
    date: date,
    author: name.value,
    imgUrl: imgUrl.value,
    content: content.value,
  };

  let vueContent = document.getElementById("content");
  vueContent.prepend(generatePost(newPost));
  // get the list content:
}
