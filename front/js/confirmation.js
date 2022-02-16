
function clear() {
    let orderId = document.getElementById("orderId");
    orderId.innerHTML = localStorage.getItem('orderId');
    localStorage.clear();
}
// affichage du message de validation et clear du local storage.
clear();
