/**
 * Importation d'une fonction globale
 */
import {NbItemLogo} from './functions.js';    
import {elementHtmlErrorProd} from './functions.js';

/**
 * Vérification que le html est chargé avant javascript 
 * Execution de la page
 */ 
window.addEventListener('DOMContentLoaded', (event) => {
  console.log( "DOM Chargé!" );
  NbItemLogo();  // Fonction globale nb item dans panier
  getProduitById();
});

/**
 * Fonction de récupération d'un seul produit en fonction de son ID
 */ 
function getProduitById() {
  //Déclaration des variables
  let urlServer = "http://localhost:3000/api/cameras/";
  let urlprod = window.location.search;
  let idCam = urlprod.substr(4);
  let monPanier = JSON.parse(localStorage.getItem('panier')) || [];

  fetch(urlServer + idCam)    // requete fetch en fonction de l'id du produit
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    
    elementHtmlProduit(json);

  }).catch(function(error) {
    console.log(error)
    elementHtmlErrorProd();
  });


/**
 * Fonction de création de la page html
 */ 
function elementHtmlProduit(json) {    
    //Récupération des données de la réponse
    let name = json.name;
    let price = json.price;
    let image = json.imageUrl;
    let description = json.description;
    let lenses = json.lenses;

    //Variables de la strucutre html
    let mainElt = document.getElementById("cam-ID");  //Balise ref
    
    let pageCam = document.createElement("div");    
    pageCam.className = "row";

    let cardCam = document.createElement("div");    
    cardCam.className = "col-lg-5 infoCam";

    let titreElt = document.createElement("h2");    
    titreElt.textContent = name;
        
    let prixElt = document.createElement("span");
    prixElt.textContent = price/100 +"  €";
    prixElt.className = "price";
    
    let imgElt = document.createElement("img");
    imgElt.className = "col-lg-7";
    imgElt.src = image;
    imgElt.alt = "image produit appareil photo";        
    
    let descElt = document.createElement("p");
    descElt.className = "description";
    descElt.textContent = description; 
    
    let lensElt = document.createElement("div");    
    lensElt.className = "choix";    

    let lensmenuElt = document.createElement("select");    
    lensmenuElt.className = "choix-lens";    

    let firstLens = document.createElement("option");
    firstLens.className = "choix1";
    firstLens.textContent = lenses[0];
    firstLens.href = "#";
    
    let secLens = document.createElement("option");
    secLens.className = "choix2";
    secLens.textContent = lenses[1];
    secLens.href = "#";
    
    let btnElt = document.createElement("button");
    // création du bouton et de la fonction servant à ajouter le produit au localStorage
    btnElt.href = "#";
    btnElt.className = "btn btn-primary";
    btnElt.textContent = "Ajouter au panier";
    btnElt.addEventListener("click", function ajoutPanier() {    
      let addCam = {
        id : idCam,
        name : name,
        prix : price,
        img : image 
      };   
      const estDansPanier = monPanier.filter(function(elem) {
        return elem.id === idCam
      }); 
      if (estDansPanier.length > 0) {          
        alert('Ce produit a déjà été ajouté !');       
      } else {            
        monPanier.push(addCam);
        alert("Vous avez ajouté le produit : " + name + " au panier !");
        localStorage.setItem('panier', JSON.stringify(monPanier));
        location.reload(NbItemLogo);  
      }  
    });        
    // Gestion parents/enfants des variables en fonction de leur emplacement dans le html
    mainElt.appendChild(pageCam);
    pageCam.appendChild(cardCam);
    pageCam.appendChild(imgElt);
    cardCam.appendChild(titreElt);
    cardCam.appendChild(prixElt);
    cardCam.appendChild(descElt);
    cardCam.appendChild(lensElt);
    lensElt.appendChild(lensmenuElt);
    lensmenuElt.appendChild(firstLens);
    lensmenuElt.appendChild(secLens);
    cardCam.appendChild(btnElt);
  }
};
