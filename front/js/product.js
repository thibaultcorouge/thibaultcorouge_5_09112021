let url = new URL(window.location.href).searchParams;
let urlID = url.get("id");

fetch("http://localhost:3000/api/products/" + urlID)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);

    let title = (document.getElementById(
      "title"
    ).innerHTML = `<h1>${response.name}</h1>`);

    let price = (document.getElementById(
      "price"
    ).innerHTML = `<p>${response.price}</p>`);

    let description = (document.getElementById(
      "description"
    ).innerHTML = `<p>${response.description}</p>`);

    let image = document.createElement("img");
    image.id = "myimg";
    image.src = `${response.imageUrl}`;
    image.alt = `${response.altTxt}`;
    document.querySelector(".item__img").appendChild(image);

    for (x in response.colors) {
      colors.options[colors.options.length] = new Option(response.colors[x]);
    }
  });


let xQuantity = document.getElementById("quantity");
let xColors = document.getElementById("colors");
let addToCart = document.getElementById("addToCart");


addToCart.addEventListener("click", (event) => {
  event.preventDefault();

  let selectedProduct = {
    id: urlID,
    image: document.getElementById("myimg").src,
    alt: document.getElementById("myimg").alt,
    name: title.textContent,
    price: price.textContent,
    color: xColors.value,
    quantity: xQuantity.value,
  };

  handleStorage(selectedProduct);
});

function handleStorage(product) {
  console.log("pick fct");

  let selectedProduct = {
    id: urlID,
    image: document.getElementById("myimg").src,
    alt: document.getElementById("myimg").alt,
    name: title.textContent,
    price: price.textContent,
    color: xColors.value,
    quantity: xQuantity.value,
  };

  //check if the storage is empty

  let inLocalStorage = JSON.parse(localStorage.getItem("products"));
  console.log(inLocalStorage)
  // console.log("pick")

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

