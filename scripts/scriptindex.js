import {NbItemLogo} from './functions.js';    //importation d'une fonction globale

// Vérification que le html est chargé avant javascript
window.addEventListener('DOMContentLoaded', (event) => {
  console.log( "DOM Chargé!" );
  NbItemLogo();   // Fonction globale affichage nb article logo panier
// Déclaration variable url serveur à requeter
  let urlServer = "http://localhost:3000/api/cameras/"; 

  fetch(urlServer)            //requète fetch serveur et réception des data json
  .then(function(response) {
    return response.json();   //si réponse   
  }).then(function(json) {
    let articles = json;
    // Boucle pour chaque article de la réponse création de la structure html suivante
    articles.forEach(function (article, index) {
        //variables servant à la création du caroussel
        let rowElt = document.querySelector(".carousel-inner");   //Balise ref
        let divCam = document.createElement("div");        
        let lienElt = document.createElement("a");
        let nameElt = document.createElement("h2");
        let priceElt = document.createElement("span");
        let imgElt = document.createElement("img");
        let legElt = document.createElement("div");    
        divCam.className = "carousel-item";        
        lienElt.href = "produit.html?id=" + article._id;        
        legElt.className = "carousel-caption d-none d-lg-block col-3";
        nameElt.textContent = article.name;
        priceElt.textContent = "Prix : " + article.price/100 + ",00 €";       
        imgElt.className = "d-block";
        imgElt.src = article.imageUrl;
        imgElt.alt ="image produit appareil photo"; 
        // Spécifique caroussel le premier item doit etre actif pour afficher caroussel            
        if (index === 0) {divCam.classList.add('active')};

        //variables servant à la création du listing
        let listingElt = document.querySelector('.cam-container');    //Balise ref
        let camListing = document.createElement('div');        
        let lienListing = document.createElement("a");        
        let imgListing = document.createElement("img");
        let nameListing = document.createElement("h2");
        let priceListing = document.createElement("span");        
        camListing.className = 'cam-listing';       
        lienListing.href = "produit.html?id=" + article._id;
        imgListing.className = 'image-prod';
        imgListing.src = article.imageUrl;
        imgListing.alt ="image produit appareil photo";
        nameListing.textContent = article.name;
        nameListing.className = "text-center";                        
        priceListing.textContent = "Prix : " + article.price/100 + ",00 €";

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
    }); 
  }).catch(function(err) {     //si problème requete fetch, affichage console
    console.log('Fetch problem: ' + err.message);
  });
});