//Importation d'une fonction globale
import {NbItemLogo} from './functions.js';

// Vérification que tout est ok avant javascript
window.addEventListener('DOMContentLoaded', (event) => {
  console.log( "DOM Chargé!" );

  // Fonction globale nb item dans panier
  NbItemLogo();

  //Déclaration des variables
  let urlServer = "http://localhost:3000/api/cameras/";
  let urlprod = window.location.search;
  let idCam = urlprod.substr(4);
  let monPanier = JSON.parse(localStorage.getItem('panier')) || [];

  // requete fetch en fonction de l'id du produit demandé
  fetch(urlServer + idCam).then(function(response) {
    return response.json();
  }).then(function(json) {
  
    // Création des éléments du markup html avec les balises et les classes en fonction de la réponse
    let name = json.name;
    let price = json.price;
    let image = json.imageUrl;
    let description = json.description;
    let lenses = json.lenses;
    let id = json._id;

    let mainElt = document.getElementById("cam-ID");
    mainElt.className = "container";

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
    
    let descElt = document.createElement("p");
    descElt.className = "description";
    descElt.textContent = description;
    
    let lensElt = document.createElement("div");
    lensElt.className = "choix";
    
    let lensmenuElt = document.createElement("select")
    lensmenuElt.className = "choix-lens";
    
    let firstLens = document.createElement("option");
    firstLens.className = "choix1";
    firstLens.textContent = lenses[0];
    firstLens.href = "#";
    
    let secLens = document.createElement("option");
    secLens.className = "choix2";
    secLens.textContent = lenses[1];
    secLens.href = "#";

    // création du bouton et de la fonction servant à ajouter le produit au localStorage
    let btnElt = document.createElement("button");
    btnElt.href = "#";
    btnElt.className = "btn btn-primary";
    btnElt.textContent = "Ajouter au panier";
    console.log(monPanier);
    btnElt.addEventListener("click", function ajoutPanier() {    
      let addCam = {
        id : idCam,
        name : name,
        prix : price,
        img : image 
      };        
      if (monPanier.valueOf(addCam[id]) === this.addCam) {          
        alert('Ce produit a déjà été ajouté !');
        console.log
      } else {            
        monPanier.push(addCam);
        alert("Vous avez ajouté le produit : " + name + " au panier !");
        localStorage.setItem('panier', JSON.stringify(monPanier));
        location.reload(true);
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