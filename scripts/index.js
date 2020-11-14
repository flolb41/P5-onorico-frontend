
// Vérification que le html est chargé avant d'exécuter le javascript
// Execution de la page
window.addEventListener('DOMContentLoaded', (event) => {
  console.log( "DOM Chargé!" );
  NbItemLogo();                   // Fonction globale affichage nb article logo panier
  getApi();                       // Fonction créant la page
});


//importation d'une fonction globale
import {NbItemLogo} from './functions.js';

// Fonction générale de la requete et création de la page html
function getApi() {
  let urlServer = "http://localhost:3000/api/cameras/";
  let promise = fetch(urlServer)                  //requète fetch serveur et réception des data
  .then(function(response) {
    return response.json();         //  on réponse converit la réponse en json   
  }).then(function(json) {
    let articles = json;

    elementHtmlCaroussel(articles); // Fonction qui créé le caroussel
    elementsHtmlListing(articles);  // Fonction qui créé le listing

  }).catch(function(err) {          //si problème requete fetch, affichage console
      console.log('Fetch problem: ' + err.message);
  }); 
};

//Fonction du caroussel, qui comporte un foreach
function elementHtmlCaroussel(articles) {
  articles.forEach(function (article, index) {

    //variables servant à la création du caroussel
    let rowElt = document.querySelector(".carousel-inner"); //Balise ref
  
    let divCam = document.createElement("div");
    divCam.className = "carousel-item";        
    if (index === 0) { divCam.classList.add('active') };

    let lienElt = document.createElement("a");
    lienElt.href = "produit.html?id=" + article._id;        

    let nameElt = document.createElement("h2");
    nameElt.textContent = article.name;

    let priceElt = document.createElement("span");
    priceElt.textContent = "Prix : " + article.price/100 + ",00 €";       

    let imgElt = document.createElement("img");
    imgElt.className = "d-block";
    imgElt.src = article.imageUrl;
    imgElt.alt ="image produit appareil photo";
 
    let legElt = document.createElement("div");    
    legElt.className = "carousel-caption d-none d-lg-block col-3";

    // Déclaration parents/enfants pour établir le squelette html
    rowElt.appendChild(divCam);
    lienElt.appendChild(legElt);
    lienElt.appendChild(imgElt);
    legElt.appendChild(nameElt);
    legElt.appendChild(priceElt);
    divCam.appendChild(lienElt); 
  });
};

//Fonction du listing, qui comporte un foreach aussi
function elementsHtmlListing(articles) {
   articles.forEach(function (article, index) {

    //variables servant à la création du listing
    let listingElt = document.querySelector('.cam-container'); //Balise ref
    
    let camListing = document.createElement('div');
    camListing.className = 'cam-listing';       
   
    let lienListing = document.createElement("a");
    lienListing.href = "produit.html?id=" + article._id;
   
    let imgListing = document.createElement("img");
    imgListing.className = 'image-prod';
    imgListing.src = article.imageUrl;
    imgListing.alt ="image produit appareil photo";

    let nameListing = document.createElement("h2");
    nameListing.textContent = article.name;
    nameListing.className = "text-center";
   
    let priceListing = document.createElement("span");                     
    priceListing.textContent = "Prix : " + article.price/100 + ",00 €";

    listingElt.appendChild(camListing);
    camListing.appendChild(lienListing);
    lienListing.appendChild(imgListing);
    lienListing.appendChild(nameListing);
    lienListing.appendChild(priceListing);
  });
};