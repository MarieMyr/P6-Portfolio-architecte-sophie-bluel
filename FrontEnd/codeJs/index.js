let galleryHTML = document.querySelector(".gallery");
let sectionFiltres = document.querySelector(".filters");


//Les boutons
let btnFilters = document.querySelectorAll(".filter_btn");
let btnLogin = document.querySelector(".btnLogin");
let btnLogout = document.querySelector(".btnLogout");
let btnAddProjets = document.querySelector(".btnModaleAddProjet");
let btnOuvertureModaleModifier = document.querySelector(".js-modaleModifier");
let btnExitModale = document.querySelector(".extitModale");
let btnReturn = document.querySelector(".js-modaleReturn");

// Les modales
let adminEditionMode = document.querySelector(".admin__editionMode");
let adminSection = document.querySelector(".admin__section");
let galleryModale = document.querySelector(".galleryModale");
let galleryModaleAffichage = document.querySelector(".modale-gallery");
let modaleAddProjet = document.querySelector(".modaleAddProjet");



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

// Reset la section projets
let allWorks = [];

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
      <span class="trash" onclick= "deleteWork(${work.id})"> <i class="fa-solid fa-trash-can "></i> </span>
    </figure>
    `;
    });
    galleryHTML.innerHTML = workListe;
    galleryModale.innerHTML = workListe;
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


// Gestions des modales
//MODALE GALLERY

// Au click sur modifier, ouvrir la modale galerie photo
btnOuvertureModaleModifier.addEventListener("click", () => {
  galleryModaleAffichage.style.display = "flex";
});

// Fermeture de la modale galerie photo au click sur la croix
btnExitModale.addEventListener("click", () => {
  galleryModaleAffichage.style.display = "none";
});

// Ouverture de la modale ajout de projet et fermeture de la moadale galerie photo
btnAddProjets.addEventListener("click", () => {
  modaleAddProjet.style.display = "flex";
  galleryModaleAffichage.style.display = "none";
});

// Bouton retour modaleAddProjet
btnReturn.addEventListener("click", () => {
  modaleAddProjet.style.display = "none";
  galleryModaleAffichage.style.display = "flex";
});


//Ajout projet /////
//Ajout eventListener sur le bouton validée
const btnValiderAjout = document.querySelector(".js-add-work")
  btnValiderAjout.addEventListener("click", addWork)

//Visualisation de l'image
  var image = document.getElementById("imgFile");
  var iconImage = document.querySelector(".fa-image")
  
  var previewPicture  = function (e) {
    image.style.display= "block"
    iconImage.style.display= "none"
     
    const [picture] = e.files

    if (picture) {
    image.src = URL.createObjectURL(picture)
      }
  } 

//Indicateur que les champs sont bien rempli 
const formulaire = document.querySelector(".formCreationProjets")

formulaire.addEventListener('input' , function() {
  const tousChampsRemplis = [...formulaire.elements].every(champ => champ.value.trim() !== "") 

if (tousChampsRemplis){
  //document.getElementById("Defaut").id = "Activate"
btnValiderAjout.id = "Activate"
} else {
  btnValiderAjout.remove
  btnValiderAjout.id = "Defaut"
}
})



function addWork(event){
  //On empêche le rechargement de la page
  event.preventDefault()
  let token = localStorage.getItem("loginToken");

  // On récupére les données reçu
  const title = document.querySelector(".js-title").value;
  const categoryId = document.querySelector(".js-categoryId").value;
  const image = document.querySelector(".js-image").files[0];

// On compile les données reçu
const formData = new FormData()
formData.append("title" , title);
formData.append("category", categoryId)
formData.append("image", image)

//Verification des champs
if (image == null) {
  alert("Veuillez selectionner une image")
  return
} else if (title == "" || categoryId =="") {
alert ("Veuillez choisir un titre et vérifier d'avoir sélectionner la bonne catégorie")
return
}

// On envoie les données du nouveau projet à l'api
fetch("http://localhost:5678/api/works", 
{
  method: "POST",
  headers: { Authorization: `Bearer ${token}`,},
  body: formData,
});

  }


//Suppression des projets au click sur la corbeille
async function deleteWork(workId) {
  console.log(workId);
  let token = localStorage.getItem("loginToken");
  console.log(token);
  if (token) {
    try {
    let response = await fetch("http://localhost:5678/api/works/" + workId,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response)
    } catch (error) {
      console.log("Suppression impossible");
    }
  }
}
