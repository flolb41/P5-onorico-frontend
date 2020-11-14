// Fonction de création du contact pour envoi au serveur 
export function Contact(firstName, lastName, address, city, email) {
    this.firstName = firstName.value;
    this.lastName = lastName.value;
    this.address = address.value;
    this.city = city.value;
    this.email = email.value;
}

// Fonction servant à afficher le nombre d'item dans le panier a coté du logo
export function NbItemLogo() {
  if (localStorage.getItem('panier') === undefined || localStorage.getItem('panier') === null || localStorage.getItem('panier') === []) {
    let nbProdCart = 0;
    let cartElt = document.querySelector('.logo-cart');
    let nbProdElt = document.createElement('span');
    nbProdElt.textContent = nbProdCart;
    cartElt.appendChild(nbProdElt);
  } else {
    let nbProdCart = JSON.parse(localStorage.getItem('panier')).length;   
    let cartElt = document.querySelector('.logo-cart');
    let nbProdElt = document.createElement('span');
    nbProdElt.textContent = nbProdCart;
    cartElt.appendChild(nbProdElt);
  };
}


