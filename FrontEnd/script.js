const works = "http://localhost:5678/api/works";
fetch(works)
  .then((r) => r.json())
  .then((data) => {
    const galleryDiv = document.getElementById("gallery");
    data.forEach((project) => {
      const figure = document.createElement("figure");

      const img = document.createElement("img");
      img.src = project.imageUrl;
      img.alt = project.title;

      const figcaption = document.createElement("figcaption");
      figcaption.textContent = project.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);

      galleryDiv.appendChild(figure);
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des données :", error);
  });

const categories = "http://localhost:5678/api/categories";
fetch(categories)
  .then((r) => r.json())
  .then((categories) => {

    const filter = document.createElement("div");
    filter.id = "filter-buttons";

    categories.forEach((category) => {
      const button = document.createElement("button");
      button.textContent = category.name;
      button.dataset.category = category.id; 
      button.addEventListener("click", filterGallery);
      filter.appendChild(button);
    });

    const main = document.querySelector("#portfolio h2");
    main.insertBefore(filter, main.secondChild);
  })

  .catch((error) => {
    console.error("Erreur lors de la récupération des catégories :");
  });


function filterGallery(event) {
  const categoryId = event.target.dataset.category;
  const galleryDiv = document.getElementById("gallery");
  const figures = galleryDiv.querySelectorAll("figure");

  figures.forEach((figure) => {
    const categories = figure.dataset.categories.split(","); 

    if (categories.includes(categoryId) || categoryId === "all") {
      figure.style.display = "block"; 
    } else {
      figure.style.display = "none"; 
    }
  });
}





