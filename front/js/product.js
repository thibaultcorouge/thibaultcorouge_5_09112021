// recuperation de l'ID du produit dans l'URL
let url = new URL(window.location.href).searchParams; 
let urlID = url.get("id");

// fetch du produit séléctionné via l'ID
// affichage du produit en ajoutant a l'interieur du code HTML les éléments du JSON correspondant au produit
fetch("http://localhost:3000/api/products/" + urlID)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);

    document.getElementById("title").innerHTML = `<h1>${response.name}</h1>`;

    document.getElementById("price").innerHTML = `<p>${response.price}</p>`;

    document.getElementById("description").innerHTML = `<p>${response.description}</p>`;

    let image = document.createElement("img");
    image.id = "myimg";
    image.src = `${response.imageUrl}`;
    image.alt = `${response.altTxt}`;
    document.querySelector(".item__img").appendChild(image);
// choix de la couleur via les couleurs disponible pour cet ID
    for (x in response.colors) {
      colors.options[colors.options.length] = new Option(response.colors[x]);
    }
  });


let xQuantity = document.getElementById("quantity");
let xColors = document.getElementById("colors");
let addToCart = document.getElementById("addToCart");

// ajout d'un élément d'écoute (click) sur le bouton "addtocart" et récupération des différents éléments (id/image/name/qty/colors)
addToCart.addEventListener("click", (event) => {
  event.preventDefault();

  let selectedProduct = {
    id: urlID,
    image: document.getElementById("myimg").src,
    alt: document.getElementById("myimg").alt,
    name: title.textContent,
    //price: price.textContent,
    color: xColors.value,
    quantity: xQuantity.value,
  };

  handleStorage(selectedProduct);
  window.alert("produit ajouté au panier!")
});
// fonction de stockage dans le local storage 
function handleStorage(product) {

  let selectedProduct = {
    id: urlID,
    image: document.getElementById("myimg").src,
    alt: document.getElementById("myimg").alt,
    name: title.textContent,
    price: price.textContent,
    color: xColors.value,
    quantity: xQuantity.value,
  };

  //check if the localstorage is empty

  let inLocalStorage = JSON.parse(localStorage.getItem("products"));
  console.log(inLocalStorage)

  // Check if localStorage is not empty and if the same id and same color is already in the local storage
  if (inLocalStorage) {
    console.log("Not Empty");
    console.log("TEST", inLocalStorage);
    let find = inLocalStorage.find(
      (element) => element.id === urlID && element.color === xColors.value);
      if (find){
        let newQuantity = parseInt(selectedProduct.quantity) + parseInt(find.quantity);
        find.quantity = newQuantity;
        localStorage.setItem("products", JSON.stringify(inLocalStorage));
        console.log(inLocalStorage);
      } 
      else {
    inLocalStorage.push(product);
    localStorage.setItem("products", JSON.stringify(inLocalStorage));
    console.log(inLocalStorage);
      }
    }
  // Check if localStorage is empty
  else {
    console.log("Empty")
    inLocalStorage = [];
    inLocalStorage.push(product);
    localStorage.setItem("products", JSON.stringify(inLocalStorage));
    console.log(inLocalStorage)
}
}

