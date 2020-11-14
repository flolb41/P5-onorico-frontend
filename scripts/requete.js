
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
    }).catch(response =>{
        console.log(response)
    }) 
    //Commande terminée on supprime le localstorage ('panier')
    localStorage.removeItem('panier'); 
};