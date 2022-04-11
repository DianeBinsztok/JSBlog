function displayImages() {
  // le root:
  let content = document.getElementById("content");
  // le container de la galerie;
  let gallery = document.createElement("div");
  gallery.className = "gallery";

  for (i = 1; i < 31; i++) {
    let img = document.createElement("img");
    img.setAttribute("src", `./img/${i}.jpg`);
    gallery.appendChild(img);
  }

  content.appendChild(gallery);
}
displayImages();
