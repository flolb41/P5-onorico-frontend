window.addEventListener('DOMContentLoaded', (event) => {
    console.log( "DOM Chargé!" );

// Ancrage sur le Html
    let mainElt = document.getElementById('confirm');
    let confElt = document.createElement('p');
    let suiviElt = document.createElement('p');
    mainElt.appendChild(confElt);
    mainElt.appendChild(suiviElt);
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
//    console.log(productsArray);

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
confElt.textContent = 'Nous vous remercions, Madame, Monsieur, ' + nomClientElt +' '+ prenomClientElt + ' ' +
'pour votre commande N° ' + commIdElt +' d\'un montant total de : ' + prixTotal + ' € ttc.'
suiviElt.textContent = 'Vous recevrez toutes les étapes de préparation de votre commande dans votre boite email à l\'adresse suivante : ' + emailClientElt + ' .' 

});