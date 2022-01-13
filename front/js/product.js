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
    //let image = document.getElementsByClassName('item__img');
    // image[0].innerHTML = `<img src="${response.imageUrl}" alt="${response.altTxt}">`;

    let image = document.createElement("img");
    image.src = `${response.imageUrl}`;
    image.alt = `${response.altTxt}`;
    document.querySelector(".item__img").appendChild(image);

    //console.log(document.getElementsByClassName('item__img').innerHTML);

    // title.innerHTML = `<h1>${response.name}</h1>`;
    //price.innerHTML = `<p>${response.price}</p>`;
    //description.innerHTML = `<p>${response.description}</p>`;
    //image[0].innerHTML = `<img src="${response.imageUrl}" alt="${response.altTxt}">`;

    for (x in response.colors) {
      colors.options[colors.options.length] = new Option(response.colors[x]);
    }
  });

let xQuantity = document.getElementById("quantity");
let xColors = document.getElementById("colors");
let addToCart = document.getElementById("addToCart");

// let cart = {};
// cart.products = [];
// localStorage.setItem("cart", JSON.stringify(cart));

addToCart.addEventListener("click", (event) => {
  event.preventDefault();

  let selectedProduct = {
    id: urlID,
    // image: image.imageUrl,
    // alt: image.altTxt,
    name: title.textContent,
    price: price.textContent,
    color: xColors.value,
    quantity: xQuantity.value,
  };

  handleStorage(selectedProduct);
  // let productLocalStorage = JSON.parse(localStorage.getItem('product'));

  // let productSaveAs = localStorage.setItem('product', JSON.stringify(addto));

  // productLocalStorage.push(productSaveAs)

  // let productSaveAs = () => {
  //     productLocalStorage.push(pick);
  //     localStorage.setItem('product', JSON.stringify(productLocalStorage));
  // }

  // console.log(localStorage.getItem('product'));
});

function handleStorage(product) {
  console.log("pick fct");

  let inLocalStorage = JSON.parse(localStorage.getItem("products"));
  console.log(inLocalStorage)
  // console.log(pick)

  // Check if localStrorage in not empty
  if (inLocalStorage) {
    console.log("Not Empty");
    console.log("TEST", inLocalStorage);
    inLocalStorage.push(product);
    localStorage.setItem("products", JSON.stringify(inLocalStorage));
    console.log(inLocalStorage);
  }
  // Check if localStorage is empty
  else {
    console.log("Empty")
    inLocalStorage = [];
    inLocalStorage.push(product);
    localStorage.setItem("products", JSON.stringify(inLocalStorage));
    console.log(inLocalStorage)
};
  //   if (localStorage && localStorage.getItem("cart")) {
  //     let cart = JSON.parse(localStorage.getItem("cart"));

  //     cart.products.push(pick);

  //     localStorage.setItem("cart", JSON.stringify(cart));
  //   }
}
