// 1 - gallery:
function displayImages() {
  // le root:
  let content = document.getElementById("content");
  // le container de la galerie;
  let gallery = document.createElement("div");
  gallery.id = "gallery";
  gallery.className = "vertical";

  for (i = 1; i < 31; i++) {
    let img = document.createElement("img");
    img.className = "image";
    img.setAttribute("src", `./img/${i}.jpg`);
    img.setAttribute("alt", "Bruce Lee being awsome");

    gallery.appendChild(img);
  }

  content.appendChild(gallery);
}

// 2 - toggle button:
let displayBtn = (document.getElementById("display_btn").onclick =
  toggleDisplay);

function toggleDisplay() {
  let gallery = document.getElementById("gallery");
  if (gallery.className == "vertical") {
    gallery.className = "mosaic";
  } else if (gallery.className == "mosaic") {
    gallery.className = "vertical";
  }
}

displayImages();
