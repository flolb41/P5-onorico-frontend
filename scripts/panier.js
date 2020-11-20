/**
 * Importation des fonctions globales
 */ 
import {Contact} from "./functions.js";
import {NbItemLogo} from './functions.js';

/**
 * Vérification que tout est ok avant javascript
 */ 
window.addEventListener('DOMContentLoaded', (event) => {
    console.log( "DOM Chargé!" );
    NbItemLogo();       //Fonction globale nb item panier
  
    // Si le panier est vide (si rien dans le localStorage)
    if (localStorage.getItem('panier') === undefined || localStorage.getItem('panier') === null || localStorage.getItem('panier') === []) {
        panierVide();
    } else { 
        panierPlein();
    }
});

/**
 * Fonction en cas depanier vide
 */ 
function panierVide() {
    let listCam = document.querySelector("tbody");
    listCam.className = "cam";

    let emptyPanier = document.createElement('p'); 
    emptyPanier.textContent = 'Oups !! Votre panier est vide';
       
    let retourAccueil = document.createElement('button'); 
    retourAccueil.className = 'btn btn-primary';
    retourAccueil.textContent = "Retour à l'accueil";
    retourAccueil.addEventListener('click', event => {
        window.location.href = 'index.html'
    });              

    let formElt = document.querySelector('form');        
    formElt.style = "display: none";

    let titreCache = document.getElementById('en-tete');        
    titreCache.style = "display: none";

    let paragTotal = document.querySelector('.p-prix-tot');        
    paragTotal.style = "display: none";

    listCam.appendChild(emptyPanier);
    listCam.appendChild(retourAccueil);     
};

/**
 * Fonction en cas de panier plein
 */ 
function panierPlein() {
    //création des variables        
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    let productId = [];
    let postData; 
    let totalpriceArray = [];
    let listCam = document.querySelector("tbody");
    listCam.className = "cam";
    //Récupération du localStorage pour creer le tableau des items dans le panier
    let monPanier = JSON.parse(localStorage.getItem('panier'));

    // Sinon on créé la structure du panier avec les infos récupérées dans le localstorage
    monPanier.forEach(function(item, index, object) { 

        //Création btn supprimer
        let btnRem = document.createElement('button');
        btnRem.className = 'fas fa-trash';
        btnRem.addEventListener('click', event => {
            let ind = monPanier.indexOf(item);          
            if (ind !== -1) { 
                monPanier.splice(ind, 1);
                localStorage.setItem('panier', JSON.stringify(monPanier));          
                document.location.reload();
            } else {
                alert('Cet élément est introuvable');
            }
        });
        let newProd = document.createElement("tr");    
        newProd.className = "camPart prod";
           
        let camImg = document.createElement('img');
        camImg.src = item.img;
        camImg.className = 'miniature';
        
        let camName = document.createElement("td");
        camName.className = "nomItem";
        camName.textContent = item.name;
        
        let qty = document.createElement("td");        
        qty.className = "quantite";

        let totCamprice = document.createElement("td");
        totCamprice.className = "total-prix-cam";
        totCamprice.textContent = item.prix/100 + ' €';            
        
        let nbItem = document.createElement("select");
        nbItem.addEventListener('change', event => {
            totCamprice.textContent = (item.prix/100) * nbItem.value +" €";
            prixTotparCam = (item.prix/100) * nbItem.value;
            totalpriceArray.splice(index, 1, prixTotparCam);
            prixTotal = totalpriceArray.reduce(reducer); 
            prixtotcommandeElt.textContent = prixTotal + ' € TTC'; 
            location.reload;                        
        });
        let lensprodCart = document.createElement('td');
        lensprodCart.className = 'lens-type';
        lensprodCart.textContent = item.lens;

        let firstChoice = document.createElement("option");
        firstChoice.textContent = '1';
        firstChoice.value = 1;            
        
        let secChoice = document.createElement("option");
        secChoice.textContent = '2';
        secChoice.value = 2;
        
        let thirChoice = document.createElement("option");
        thirChoice.textContent = '3';
        thirChoice.value = 3;

        // Variables pour le calcul du prix total
        let itemId = item.id;
        let prixTotparCam = (item.prix/100);            
        let prixTotal = 0;
        let prixtotcommandeElt = document.querySelector('.prixTtc');
           
        let camPrice = document.createElement("td");
        camPrice.className = "prix-unit";
        camPrice.textContent = item.prix/100 +" €";
        
        productId.push(itemId);
        totalpriceArray.push(prixTotparCam);
        
        // Affichage prix intermédiaire et prix total en fonction de la quantité 
        prixTotal = totalpriceArray.reduce(reducer); 
        prixtotcommandeElt.textContent = prixTotal + ' € TTC';                
    
        // Association Parents/Enfants plus pratique pour ordre affichage
        listCam.appendChild(newProd);
        newProd.appendChild(camImg);
        newProd.appendChild(camName);
        newProd.appendChild(lensprodCart);
        newProd.appendChild(qty);
        qty.appendChild(nbItem);
        nbItem.appendChild(firstChoice);
        nbItem.appendChild(secChoice);
        nbItem.appendChild(thirChoice);
        newProd.appendChild(camPrice);
        newProd.appendChild(totCamprice);
        newProd.appendChild(btnRem);           
    })
    //Création des variables du formulaire
    let lastnameReq = document.getElementById('last_name');
    let firstnameReq = document.getElementById('first_name');
    let mailReq = document.getElementById('email');
    let addressReq= document.getElementById('address');
    let cityReq = document.getElementById('ville');
    let arrayContact = [firstnameReq, lastnameReq, addressReq, cityReq];

    //Ajout du bouton permettant de passer à la validation du panier
    let mainElt = document.querySelector('.panier'); 

    //Lors de la validation du panier, on vérifie les entrées du formulaire
    let validation = document.querySelector('#save');
    validation.className = 'btn btn-success';
    validation.textContent = 'Valider le panier';
    mainElt.appendChild(validation);
    validation.addEventListener('click', function checkEntries() {
        let error = false;
        let error1 = false;

        arrayContact.forEach(function(item, index, array) {
            if (item.value === "") {
                item.className = "form-control is-invalid"; 
                alert('Veuillez remplir les champs obligatoires');
                error = true;
            } else {
                item.className = "form-control is-valid";
                error = false;   
            }    
        });
       
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mailReq.value)) {
            mailReq.className = 'form-control is-valid'; 
        } else {
            alert("Votre adresse e-mail n'est pas valide");
            mailReq.className = 'form-control is-invalid'; 
            let errorMail = document.createElement('div');
            errorMail.className ='invalid-feedback';
            errorMail.textContent = 'Votre E-mail doit être sous la forme nom@exemple.fr';
            document.querySelector('.email-val').appendChild(errorMail);
            return false;            
        };
         if (error === true) {
            return false;
        };
        //récupération et mise en forme des données à envoyer au serveur
        let contact = new Contact(firstnameReq, lastnameReq, addressReq, cityReq, mailReq);    
        let products = productId;            
        postData = {'contact':contact, 'products':products};

        /**
         * Requête Post des données puis récupération de la réponse du serveur
         * qui est stockée en localStorage ('confirmation') enfin on envoie 
         * directement le client sur la page
         */
        postCommande(postData);
    })

};
