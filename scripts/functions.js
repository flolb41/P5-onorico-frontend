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

let panier = JSON.parse(localStorage.getItem('panier'));
let nbProdCart = panier.length;
console.log(nbProdCart);

export function NbItemLogo() {    
  let cartElt = document.querySelector('header div');
  let nbProdElt = document.createElement('span');
  nbProdElt.textContent = nbProdCart;
  cartElt.appendChild(nbProdElt);
};