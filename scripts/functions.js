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

// Fonction renseignant le visiteur d'une erreur serveur sur page index
export function elementHtmlError() {
  let newsElt = document.querySelector('.news');
  newsElt.style = 'display: none';
  let carouselElt = document.querySelector('.carousel');
  carouselElt.style = 'display: none';
  let listingElt = document.querySelector('.listing');
  listingElt.style = 'display: none';

  let mainErrorElt = document.querySelector('main');
  let errorElt = document.createElement('p');
  errorElt.className = 'erreur-serveur';
  errorElt.textContent = 'Le serveur est momentanément inaccessible. Nous nous excusons pour la gène occasionnée et faisons notre possible pour régler ce désagrément.' 
  mainErrorElt.appendChild(errorElt);
};

// Fonction renseignant le visiteur d'une erreur serveur sur page index
export function elementHtmlErrorProd() {
  let mainErrorElt = document.querySelector('main');
  let errorElt = document.createElement('p');
  errorElt.className = 'erreur-serveur';
  errorElt.textContent = 'Le serveur est momentanément inaccessible. Nous nous excusons pour la gène occasionnée et faisons notre possible pour régler ce désagrément.' 
  mainErrorElt.appendChild(errorElt);
};
