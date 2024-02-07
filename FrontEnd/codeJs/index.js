let galleryHTML = document.querySelector(".gallery");



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