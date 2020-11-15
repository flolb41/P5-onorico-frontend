function postApi(postData) {
    let urlPost = 'http://localhost:3000/api/cameras/order';
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
        localStorage.removeItem('panier');     //Commande terminée on supprime le localstorage ('panier')
    }).catch(response =>{
        console.log(response);
        postApiError();
    }) 
};

//Fonction appelée en cas d'erreur serveur
function postApiError() {
    alert('Une erreur provenant du serveur ne nous permet pas de finaliser votre commande. Veuillez nous en excuser et réessayer ultérieurement.')
};