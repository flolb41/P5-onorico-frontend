// Fonction de création du contact pour envoi au serveur 
let lastnameReq = document.getElementById('last_name');
let firstnameReq = document.getElementById('first_name');
let mailReq = document.getElementById('email');
let addressReq= document.getElementById('address');
let cityReq = document.getElementById('ville');

export function Contact(firstName, lastName, address, city, email) {
    this.firstName = firstnameReq.value;
    this.lastName = lastnameReq.value;
    this.address = addressReq.value;
    this.city = cityReq.value;
    this.email = mailReq.value;
}

// Fonction servant à afficher le nombre d'item dans le panier a coté du logo

export function NbItemLogo() {
  if (localStorage.getItem('panier') === null) {
    let nbProdCart = 0;
  } else {
    let nbProdCart = JSON.parse(localStorage.getItem('panier')).length;   
    let cartElt = document.querySelector('header div');
    let nbProdElt = document.createElement('span');
    nbProdElt.textContent = nbProdCart;
    cartElt.appendChild(nbProdElt);
  };
}