import {Contact} from "./functions.js";
import {NbItemLogo} from './functions.js';

// Vérification que tout est ok avant javascript
window.addEventListener('DOMContentLoaded', (event) => {console.log( "DOM Chargé!" )
    NbItemLogo();
    let productId = [];
    let postData; 
    let totalpriceArray = [];
    let totalPrice;
    let urlPost = 'http://localhost:3000/api/cameras/order';
    let promisePost;
    let listCam = document.querySelector("tbody");
    listCam.className = "cam";
    let monPanier = JSON.parse(localStorage['panier']);
//Si le panier est vide (si rien dans le localStorage)
    if (localStorage.key('panier') === null || monPanier.length == 0) {
        let emptyPanier = document.createElement('p');
        emptyPanier.textContent = 'Oups !! Votre panier est vide';
        listCam.appendChild(emptyPanier);
        let retourAccueil = document.createElement('button');
        retourAccueil.className = 'btn btn-primary';
        retourAccueil.textContent = "Retour à l'accueil";
        retourAccueil.addEventListener('click', event => {
            window.location.href = 'index.html'
        });
        listCam.appendChild(retourAccueil);
        let titreCache = document.getElementById('en-tete');
        titreCache.style = "display:none";
        let formElt = document.querySelector('form');
        formElt.style = "display:none";

    } else {
// Sinon on créé la structure du panier avec les infos récupérées dans le localstorage
        monPanier.forEach(function(item, index, object) {      
//Création bouton supprimer du panier
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
        
        let id = item.id;
        productId.push(id);

        let camName = document.createElement("td");
        camName.className = "nomItem";
        camName.textContent = item.name;
    
        let qty = document.createElement("td");
        qty.className = "quantite";

        let totCamprice = document.createElement("td");
        totCamprice.className = "total-prix-cam";
        totCamprice.textContent = item.prix/100 + ' €';
        let prixTotparCam = (item.prix/100);
        totalpriceArray.push(prixTotparCam);
        let prixTotal = 0;
        console.log(totalpriceArray);

        let nbItem = document.createElement("select");
        nbItem.id = "nombre";
        nbItem.addEventListener('change', function () {
            totCamprice.textContent = (item.prix/100) * this.value +" €";
            prixTotparCam = (item.prix/100) * this.selectedIndex.value;
            totalpriceArray.push(prixTotparCam);
            location.reload;
        })
        let reducer = (accumulator, currentValue) => accumulator + currentValue;
        prixTotal = totalpriceArray.reduce(reducer);
        console.log(prixTotal);

        let firstChoice = document.createElement("option");
        firstChoice.className = "choice1";
        firstChoice.textContent = 1;
        firstChoice.value = 1;

        let secChoice = document.createElement("option");
        secChoice.className = "choice2";
        secChoice.textContent = '2';
        secChoice.value = 2;

        let thirChoice = document.createElement("option");
        thirChoice.className = "choice3";
        thirChoice.textContent = '3';
        thirChoice.value = 3
    
        let camPrice = document.createElement("td");
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
        let mainElt = document.querySelector('.container'); 
        let validation = document.createElement('a');
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
            let contact = new Contact();    
            let products = productId;            
            postData = {'contact':contact, 'products':products};

//Post mon panier + coordonnées
    fetch(urlPost, {
        method: 'POST',
        mode:'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(postData),
    }).then(response => {
        return response.json();
    }).then(json => {
        let confirmation = JSON.stringify(json);
        console.log('requète ok');
        console.log(confirmation);
        localStorage.setItem('confirmation', confirmation);
        window.location = './confirmation.html';   
    }).catch(response =>{
        console.log(response)})        
    });
}});