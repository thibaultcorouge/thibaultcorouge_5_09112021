
function clear() {
    let orderId = document.getElementById("orderId");
    orderId.innerHTML = localStorage.getItem('orderId');
    localStorage.clear();
}

clear();
