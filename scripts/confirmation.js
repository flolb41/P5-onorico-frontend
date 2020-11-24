/**
 * Vérification que tout est ok avant javascript
 */ 
window.addEventListener('DOMContentLoaded', (event) => {
    console.log( "DOM Chargé!" );
    elementHtmlConfirmation();
});

/**
 * Fonction de création de la page deconfirmation
 */
function elementHtmlConfirmation() {
// Ancrage sur le Html
    let mainElt = document.querySelector('.corps');
    let nCommElt = document.createElement('p');
    nCommElt.className = 'order-number';
    let bravoElt = document.createElement('p');
    bravoElt.className = 'bravo';
    let confElt = document.createElement('p');
    confElt.className = 'confirm';
    let suiviElt = document.createElement('p');
    suiviElt.className = 'suivi';
    let merciElt = document.createElement('p');
    merciElt.className ='merci';

    mainElt.appendChild(nCommElt);
    mainElt.appendChild(bravoElt);
    mainElt.appendChild(confElt);
    mainElt.appendChild(suiviElt);
    mainElt.appendChild(merciElt);

// Récup resultat requète post stockée en localStorage
    let confData = JSON.parse(localStorage.getItem('confirmation'));

//Récup des diverses infos recues
    let productsArray = confData.products;
    let prenomClientElt = confData.contact['firstName'];
    let nomClientElt = confData.contact['lastName'];
    let emailClientElt = confData.contact['email'];
    let commIdElt = confData.orderId;
    let arrayProdPrix = [];
    let prixTotal;

//Récup du prix de chaque produit dans un tableau
    productsArray.forEach(function(item, index, array) {
        let productPrice = item.price/100;
        arrayProdPrix.push(productPrice);
        });
// addition de tous les prix pour avoir le prix total de la commande
    prixTotal = arrayProdPrix.reduce(function(accumulateur, valeurCourante, index, array){
        return accumulateur + valeurCourante;
        });
//console.log(prixTotal);
    
//Création des deux paragraphes de la page de confirmation
nCommElt.innerHTML = 'Commande N° '+commIdElt;
bravoElt.innerHTML = 'Félicitations ' + prenomClientElt + ' ' + nomClientElt + ' !!';
confElt.innerHTML = 'Votre commande d\'un montant total de : ' + prixTotal + ' € ttc. a bien été prise en compte.';
suiviElt.innerHTML = 'Nous vous enverrons toutes les étapes de sa préparation à votre adresse email : ' + emailClientElt + ' .' 
merciElt.innerHTML = 'Toute l\'équipe vous remercie de votre visite et vous dit a bientôt !!';

//suppression de la confirmation envoyée par le serveur dans le localstorage
let delConferv = document.querySelector('button');
delConferv.addEventListener( 'click', event => {
    localStorage.removeItem('confirmation');
    window.location.href = './index.html';
})
};