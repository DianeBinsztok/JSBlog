function displayImages() {
  // le root:
  let content = document.getElementById("content");
  // le container de la galerie;
  let gallery = document.createElement("div");
  gallery.id = "gallery";

  for (i = 1; i < 31; i++) {
    let img = document.createElement("img");
    img.className = "image";
    img.setAttribute("src", `./img/${i}.jpg`);
    img.setAttribute("alt", "Bruce Lee being awsome");

    gallery.appendChild(img);
  }

  content.appendChild(gallery);
}
displayImages();
