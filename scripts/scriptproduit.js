import {NbItemLogo} from './functions.js';    //Importation d'une fonction globale

// Vérification que le html est chargé avant javascript
window.addEventListener('DOMContentLoaded', (event) => {
  console.log( "DOM Chargé!" );
  NbItemLogo();  // Fonction globale nb item dans panier

  //Déclaration des variables
  let urlServer = "http://localhost:3000/api/cameras/";
  let urlprod = window.location.search;
  let idCam = urlprod.substr(4);
  let monPanier = JSON.parse(localStorage.getItem('panier')) || [];

  fetch(urlServer + idCam)    // requete fetch en fonction de l'id du produit
  .then(function(response) {
    return response.json();
  }).then(function(json) {
  
    //Récupération des données de la réponse
    let name = json.name;
    let price = json.price;
    let image = json.imageUrl;
    let description = json.description;
    let lenses = json.lenses;

    //Variables de la strucutre html
    let mainElt = document.getElementById("cam-ID");  //Balise ref
    let pageCam = document.createElement("div");
    let cardCam = document.createElement("div");
    let titreElt = document.createElement("h2");        
    let prixElt = document.createElement("span");
    let imgElt = document.createElement("img");        
    let descElt = document.createElement("p");
    let lensElt = document.createElement("div");
    let lensmenuElt = document.createElement("select")
    let firstLens = document.createElement("option");
    let secLens = document.createElement("option");
    let btnElt = document.createElement("button");

    pageCam.className = "row";
    cardCam.className = "col-lg-5 infoCam";
    titreElt.textContent = name;
    prixElt.textContent = price/100 +"  €";
    prixElt.className = "price";
    imgElt.className = "col-lg-7";
    imgElt.src = image;
    imgElt.alt = "image produit appareil photo";
    descElt.className = "description";
    descElt.textContent = description;    
    lensElt.className = "choix";    
    lensmenuElt.className = "choix-lens";    
    firstLens.className = "choix1";
    firstLens.textContent = lenses[0];
    firstLens.href = "#";    
    secLens.className = "choix2";
    secLens.textContent = lenses[1];
    secLens.href = "#";

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
      const estDansPanier = monPanier.filter(function(elem){return elem.id === idCam}); 
      console.log(estDansPanier);
      if (estDansPanier.length > 0) {          
        alert('Ce produit a déjà été ajouté !');       
        location.reload;
      } else {            
        monPanier.push(addCam);
        alert("Vous avez ajouté le produit : " + name + " au panier !");
        localStorage.setItem('panier', JSON.stringify(monPanier));
        location.reload;
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
  });
}); 