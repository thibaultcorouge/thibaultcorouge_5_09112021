let inLocalStorage = JSON.parse(localStorage.getItem("products"));
console.log(inLocalStorage);

let products = [];
let itemproduct = [];

// affichage des différents produits du local storage sur la page

for (i = 0; i < inLocalStorage.length; i++) {
  products.push(inLocalStorage[i].id);

  itemproduct =
    itemproduct +
    `
            <article class="cart__item" data-id="${inLocalStorage[i].id}" data-color="${inLocalStorage.color}">
                <div class="cart__item__img">
                  <img src="${inLocalStorage[i].image}" alt="${inLocalStorage[i].alt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${inLocalStorage[i].name}</h2>
                    <p>${inLocalStorage[i].color}</p>
                    <p>${inLocalStorage[i].price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${inLocalStorage[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
`;
}
if (i === inLocalStorage.length) {
  let itemCart = document.getElementById("cart__items");
  itemCart.innerHTML += itemproduct;
}


// fonction de suppression du produit dans la page checkout

deleteProduct();

function deleteProduct() {
  let deleteItem = document.querySelectorAll(".deleteItem");

  for (let j = 0; j < deleteItem.length; j++) {
    deleteItem[j].addEventListener("click", (event) => {
      event.preventDefault();

      let deleteId = inLocalStorage[j].id;
      let deleteColor = inLocalStorage[j].color;

      inLocalStorage = inLocalStorage.filter(
        (element) => element.id !== deleteId || element.color !== deleteColor
      );

      localStorage.setItem("products", JSON.stringify(inLocalStorage));
      window.location.href = "cart.html";
    });
  }
}


// fonction d'ajout de la quantité pour un produit via le selecteur "quantity"

productQuantity();

function productQuantity() {
  let itemQuantity = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < itemQuantity.length; k++) {
    itemQuantity[k].addEventListener("click", (event) => {
      event.preventDefault();

      let newItemQuantity = itemQuantity[k].value;
      let newLocalStorage = {
        quantity: newItemQuantity,
        id: inLocalStorage[k].id,
        image: inLocalStorage[k].image,
        alt: inLocalStorage[k].alt,
        name: inLocalStorage[k].name,
        color: inLocalStorage[k].color,
        price: inLocalStorage[k].price,
      };

      inLocalStorage[k] = newLocalStorage;

      localStorage.setItem("products", JSON.stringify(inLocalStorage));
      window.location.href = "cart.html";
    });
  }
    
}


// calcul de la quantité total d'un produit

totalProduct();

function totalProduct() {
  let itemTotal = 0;
  for (l in inLocalStorage) {
    let newQuantity = parseInt(inLocalStorage[l].quantity, 10);

    itemTotal += newQuantity;

    let totalQuantity = document.getElementById("totalQuantity");
    totalQuantity.textContent = itemTotal;
  }
}


// calcul du prix total de la commande


totalPrice();

function totalPrice() {
  let simpleMath = [];
  for (m in inLocalStorage) {
    let cartPrice = inLocalStorage[m].price * inLocalStorage[m].quantity;
    simpleMath.push(cartPrice);

    let decrease = (oldValue, newValue) => oldValue + newValue;
    total = simpleMath.reduce(decrease);
  }

  let totalPrice = document.getElementById("totalPrice");
  totalPrice.textContent = total;
}

// fonction de validation des inputs dans le formulaire a l'aide des REGEX

  
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let address = document.getElementById("address");
  let city = document.getElementById("city");
  let email = document.getElementById("email");

  let textRGEX = /^[a-zA-Z àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]/;
  let addressRGEX = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
  let emailRGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  let firstNameResult = document.getElementById("firstNameErrorMsg");
  let lastNameResult = document.getElementById("lastNameErrorMsg");
  let addressResult = document.getElementById("addressErrorMsg");
  let cityResult = document.getElementById("cityErrorMsg");
  let emailResult = document.getElementById("emailErrorMsg")


  firstName.addEventListener('change', function(a){
    validFirstName(this);
  });
  
  let validFirstName = function (firstNameValue) {
    if (textRGEX.test(firstNameValue.value)) {
      firstNameResult.textContent = ("");
      return true;
    }
    else{
      firstNameResult.textContent = ("veuillez entrer un prénom valide");
      return false;
    }
  }

  lastName.addEventListener('change', function(b){
    validLastName(this);
  });

  let validLastName = function (lastNameValue) {
    if (textRGEX.test(lastNameValue.value)) {
      lastNameResult.textContent = ("");
      return true;
    }
    else{
      lastNameResult.textContent = ("veuillez entrer un nom valide");
      return false;
    }
  }

  address.addEventListener('change', function(){
    validAddress(this);
  });

  let validAddress = function (addressValue) {
    if (addressRGEX.test(addressValue.value)) {
      addressResult.textContent = ("");
      return true;
    }
    else{
      addressResult.textContent = ("veuillez entrer une addresse valide");
      return false;
    }
  }

  city.addEventListener('change', function() {
    validCity(this);
  });

  let validCity = function (cityValue) {
    if (textRGEX.test(cityValue.value)) {
    cityResult.textContent = ("");
    return true;
    }
    else{
    cityResult.textContent = ("veuillez entrer une ville valide");
    return false;
    }
  }

  email.addEventListener('change', function() {
    validEmail(this);
  });

  let validEmail = function (emailValue) {
    if (emailRGEX.test(emailValue.value)) {
    emailResult.textContent = ("");
    }
    else{
    emailResult.textContent = ("veuillez entrer une addresse Email valide");
    }
  }

contactForm();
// fonction de validation du formulaire permettant l'envoi vers le back uniquement si les conditions du formulaire sont remplis
function contactForm() {

  let order = document.getElementById("order");
  order.addEventListener('click', (event) => {
  event.preventDefault();

  
  if (emailResult.textContent === ('') && cityResult.textContent === ('')
  && addressResult.textContent === ('') && lastNameResult.textContent === ('') 
  && firstNameResult.textContent === ('') && firstName && firstName.value 
  && lastName && lastName.value && address && address.value && city && city.value 
  && email && email.value ){
  console.log('OK');


  let contact = {
    firstName : document.getElementById('firstName').value,
    lastName : document.getElementById('lastName').value,
    address : document.getElementById('address').value,
    city : document.getElementById('city').value,
    email : document.getElementById('email').value,
  }


  console.log(contact);
  console.log(products);
 



  const checkout = {
    contact,
    products,
  }

  const options = {
    method: 'POST',
    body : JSON.stringify(checkout),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  };

  fetch('http://localhost:3000/api/products/order', options)
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem('orderId', data.orderId);
    document.location.href = "confirmation.html?id=" + data.orderId;
    console.log(data);
  })
  

} else {
  console.log('pas ok')
  window.alert('merci de remplir tous les champs!')
}
})
}