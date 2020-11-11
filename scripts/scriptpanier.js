//Importation des fonctions globales
import {Contact} from "./functions.js";
import {NbItemLogo} from './functions.js';

// Vérification que tout est ok avant javascript
window.addEventListener('DOMContentLoaded', (event) => {
    console.log( "DOM Chargé!" );
    NbItemLogo();       //Fonction globale nb item panier
  
    //création des variables
    let productId = [];
    let postData; 
    let totalpriceArray = [];
    let urlPost = 'http://localhost:3000/api/cameras/order';
    let listCam = document.querySelector("tbody");
    listCam.className = "cam";
    //Si le panier est vide (si rien dans le localStorage)
    if (localStorage.getItem('panier') === undefined || localStorage.getItem('panier') === null || localStorage.getItem('panier') === []) {
        let emptyPanier = document.createElement('p');        
        let retourAccueil = document.createElement('button');
        let formElt = document.querySelector('form');
        let titreCache = document.getElementById('en-tete');
        let paragTotal = document.querySelector('.p-prix-tot');
        emptyPanier.textContent = 'Oups !! Votre panier est vide';
        listCam.appendChild(emptyPanier);
        listCam.appendChild(retourAccueil);
        titreCache.style = "display: none";
        formElt.style = "display: none";
        paragTotal.style = "display: none";
        retourAccueil.className = 'btn btn-primary';
        retourAccueil.textContent = "Retour à l'accueil";
        retourAccueil.addEventListener('click', event => {
            window.location.href = 'index.html'
        });              
    } else { 
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
            let camImg = document.createElement('img');
            let camName = document.createElement("td");
            let qty = document.createElement("td");
            let totCamprice = document.createElement("td");            
            let nbItem = document.createElement("select");
            let itemId = item.id;
            let prixTotparCam = (item.prix/100);            
            let prixTotal = 0;
            let prixtotcommandeElt = document.querySelector('.prixTtc');
            let reducer = (accumulator, currentValue) => accumulator + currentValue;
            let firstChoice = document.createElement("option");            
            let secChoice = document.createElement("option");
            let thirChoice = document.createElement("option");
            let camPrice = document.createElement("td");

            newProd.className = "camPart prod";
            camImg.src = item.img;
            camImg.className = 'miniature';
            productId.push(itemId);
            camName.className = "nomItem";
            camName.textContent = item.name;
            qty.className = "quantite";
            totCamprice.className = "total-prix-cam";
            totCamprice.textContent = item.prix/100 + ' €';
            totalpriceArray.push(prixTotparCam);
            // Affichage prix intermédiaire et prix total en fonction de la quantité 
            prixTotal = totalpriceArray.reduce(reducer); 
            prixtotcommandeElt.textContent = prixTotal + ' € TTC';                
            nbItem.addEventListener('change', event => {
                totCamprice.textContent = (item.prix/100) * nbItem.value +" €";
                prixTotparCam = (item.prix/100) * nbItem.value;
                totalpriceArray.splice(index, 1, prixTotparCam);
                prixTotal = totalpriceArray.reduce(reducer); 
                prixtotcommandeElt.textContent = prixTotal + ' € TTC'; 
                location.reload;                        
            });
            firstChoice.textContent = 1;
            firstChoice.value = 1;
            secChoice.textContent = '2';
            secChoice.value = 2;
            thirChoice.textContent = '3';
            thirChoice.value = 3
            camPrice.className = "prix-unit";
            camPrice.textContent = item.prix/100 +" €";
       
            // Association Parents/Enfants plus pratique pour ordre affichage
            listCam.appendChild(newProd);
            newProd.appendChild(camImg);
            newProd.appendChild(camName);
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
        let arrayContact = [firstnameReq, lastnameReq, addressReq, cityReq, mailReq];

        //Ajout du bouton permettant de passer à la validation du panier
        let mainElt = document.querySelector('.panier'); 
    
        //Lors de la validation du panier, on vérifie les entrées du formulaire
        let validation = document.querySelector('#save');
        validation.className = 'btn btn-success';
        validation.textContent = 'Valider le panier';
        mainElt.appendChild(validation);
        validation.addEventListener('click', function checkEntries() {
            let error = false;
            arrayContact.forEach(function(item, index, array) {
                if (item.value === "") {
                    item.className = "form-control is-invalid";
                    error = true;
                } else {
                    item.className = 'form-control is-valid';
                }
            }) 
            if (true == error) {
                alert('Veuillez remplir les champs obligatoires');
                return false;
            };
            //récupération et mise en forme des données à envoyer au serveur
            let contact = new Contact(firstnameReq, lastnameReq, addressReq, cityReq, mailReq);    
            let products = productId;            
            postData = {'contact':contact, 'products':products};

            //Requête Post des données puis récupération de la réponse du serveur
            //qui est stockée en localStorage ('confirmation') enfin on envoie 
            //directement le client sur la page
            fetch(urlPost, {
                method: 'POST',
                mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(postData),
            }).then(response => {
                return response.json();
            }).then(json => {
                let confirmation = JSON.stringify(json);
                localStorage.setItem('confirmation', confirmation);
                window.location = './confirmation.html';   
            }).catch(response =>{
                console.log(response)
            }) 
            //Commande terminée on supprime le localstorage ('panier')
            localStorage.removeItem('panier'); 
        });
    }
});