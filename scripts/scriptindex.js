
//importation d'une fonction globale
import {NbItemLogo} from './functions.js';

// Vérification que tout est ok avant javascript
window.addEventListener('DOMContentLoaded', (event) => {
  console.log( "DOM Chargé!" );

// Déclaration variable url serveur, point de depart pour récup data
  let urlServer = "http://localhost:3000/api/cameras/"; 

//requète fetch pour interrogation serveur et réception des data json
  fetch(urlServer).then(function(response) {
    return response.json();
    //si réponse
    }).then(function(json) {
      let articles = json;

// Fonction globale qui permet d'afficher à coté du logo panier 
// le nombre de produit actuellement dans le panier      
      NbItemLogo();

// Boucle pour chaque article de la réponse création de la structure html suivante
// On aura ici la création d'un caroussel pour les nouveautés et d'une liste de produits
      articles.forEach(function (article, index) {
        let listingElt = document.querySelector('.cam-container');
        let camListing = document.createElement('div');
        camListing.className = 'cam-listing';

        let rowElt = document.querySelector(".carousel-inner");
        let divCam = document.createElement("div");
        divCam.className = "carousel-item";

        let idElt = document.createElement("span");
        idElt.textContent = article._id;

        let nameElt = document.createElement("h2");
        nameElt.textContent = article.name;
        nameElt.className = "text-center";

        let nameListing = document.createElement("h2");
        nameListing.textContent = article.name;
        nameListing.className = "text-center";

        let priceElt = document.createElement("span");
        priceElt.textContent = "Prix : "+article.price/100+",00 €";

        let priceListing = document.createElement("span");
        priceListing.textContent = "Prix : "+article.price/100+",00 €";

        let descElt = document.createElement("p");
        descElt.textContent = article.description;
        descElt.className = "text-center";

        let imgElt = document.createElement("img");
        imgElt.className = "d-block";
        imgElt.src = article.imageUrl;
        imgElt.alt ="image produit appareil photo";

        let imgListing = document.createElement("img");
        imgListing.className = 'image-prod';
        imgListing.src = article.imageUrl;
        imgListing.alt ="image produit appareil photo";

        let lensElt = document.createElement("ul");
        lensElt.innerHTML = "<li>"+article.lenses[0]+"</li><li>"+article.lenses[1]+"</li>";

        let lienElt = document.createElement("a");
        lienElt.href = "produit.html?id=" + article._id;

        let lienListing = document.createElement("a");
        lienListing.href = "produit.html?id=" + article._id;

        let legElt = document.createElement("div");
        legElt.className = "carousel-caption d-none d-md-block col-3";

// Déclaration parents/enfants pour établir le squelette html
        rowElt.appendChild(divCam);
        lienElt.appendChild(legElt);
        lienElt.appendChild(imgElt);
        legElt.appendChild(nameElt);
        legElt.appendChild(priceElt);
        divCam.appendChild(lienElt);  
        listingElt.appendChild(camListing);
        camListing.appendChild(lienListing);
        lienListing.appendChild(imgListing);
        lienListing.appendChild(nameListing);
        lienListing.appendChild(priceListing);

// Spécifique caroussel le premier item doit etre actif pour afficher caroussel            
        if (index === 0) {
          divCam.className = "active carousel-item";
      }
    }); 
//si problème sur la requete fetch, on l'affiche dans la console
    }).catch(function(err) {
  console.log('Fetch problem: ' + err.message);
});
});