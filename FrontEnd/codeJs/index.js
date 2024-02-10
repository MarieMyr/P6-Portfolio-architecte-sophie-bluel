let galleryHTML = document.querySelector(".gallery");
let sectionFiltres = document.querySelector(".filters");

let adminEditionMode = document.querySelector(".admin__editionMode");
let adminSection = document.querySelector(".admin__section");

//Les boutons
let btnFilters = document.querySelectorAll(".filter_btn");
let btnLogin = document.querySelector(".btnLogin");
let btnLogout = document.querySelector(".btnLogout");


// Gestion de l'affichage des boutons admin
  function adminBoard() {
    let token = localStorage.getItem("loginToken");
    console.log(token);

    if (token == null) {
    btnLogin.style.display = "flex";
    btnLogout.style.display = "none";
    adminEditionMode.style.display = "none";
    adminSection.style.display = "none";
    sectionFiltres.style.display = "flex";
  } else {
    btnLogin.style.display = "none";
    btnLogout.style.display = "flex";
    adminEditionMode.style.display = "flex";
    adminSection.style.display = "flex";
    sectionFiltres.style.display = "none";
  }
}
adminBoard();

// Déconnection de la page d'accueil
btnLogout.addEventListener("click", () => {
  localStorage.removeItem("loginToken");
  window.location.href = "index.html";
});

// Génération des projets dynamiquement
//Récupération des travaux via l'API
    async function getAllWorks() {
        const reponse = await fetch("http://localhost:5678/api/works");
        let works = await reponse.json();
        allWorks = [...works];
        showAllWorks(works);
    }
    getAllWorks();
    
// Affichage des travaux dans la gallery
    function showAllWorks(listeOfWorks) {
    let workListe = "";
    listeOfWorks.forEach((work) => {
      workListe =
        workListe +
        `
    <figure>
      <img src="${work.imageUrl}" alt="${work.title}">
      <figcaption> ${work.title}</figcaption>
    </figure>
    `;
    });
    galleryHTML.innerHTML = workListe;
    }


// Section des Filtres
btnFilters.forEach((btn, index) => {
    btn.addEventListener("click", (event) => {
      let filterWorks = allWorks.filter((work) => work.categoryId == index);
  
      if (index == 0) {
        showAllWorks(allWorks);
      } else {
        showAllWorks(filterWorks);
      }
      toggleActivatebtn(index);
    });
  });


// Changer le bouton activer au click
  function toggleActivatebtn(btnId) {
    btnFilters.forEach((btn) => {
      btn.classList.remove("filter_btn_active");
    });
    btnFilters[btnId].classList.add("filter_btn_active");
  }