// async function Recup() {
//     let API = await fetch('http://localhost:3000/api/products')
//     .catch(_error => { 
//         alert('something went wrong try agin later!')
//     })
//     return API.json();
// }
// Recup();

// async function mef() {
//     let result = Recup()
//     .then(function (resultatAPI){
//         const articles = resultatAPI;
//         console.log(articles);
//         for (let article in articles) {

//             let lien = document.createElement("a");
//             document.querySelector(".items").appendChild(lien);
//             lien.href = "product.html?id=${resultatAPI[article]._id}";

//             let produit = document.createElement("article");
//             lien.appendChild(produit);

//             let Img = document.createElement("img");
//             produit.appendChild(Img);
//             Img.src = resultatAPI[article].imageUrl;
//             Img.alt = resultatAPI[article].altTxt;

//             let Name = document.createElement("h3");
//             produit.appendChild(Name);
//             Name.classList.add("Name");
//             Name.innerHTML = resultatAPI[article].name;

//             let Description = document.createElement("p");
//             produit.appendChild(Description);
//             Description.classList.add("Name");
//             Description.innerHTML = resultatAPI[article].description;
//         }
//     })
    
//     .catch(_error => { 
//         alert('something went wrong try agin later!')
//     })
// }
// mef();


fetch('http://localhost:3000/api/products')
    .then((response) => response.json())
    .then((response) =>{
        console.log(response);
        
        for (product of response) {

            let item = document.getElementById("items");

            item.innerHTML += `
            <a href="./product.html?id=${product._id}">
                <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                </article>
            </a>`
        }
    })

    .catch(function (err) {
        ErrorEvent("fetch Error");
    });

//fetch('http://localhost:3000/api/products')
//.then((response) => response.json())
//.then((response) =>{ showProducts(response);

// function showProducts(response) {
//         for (product of response) {
//             const itemCard = document.getElementById('items');
//             itemCard.innerHTML +=`
//             <a href="./product.html?id=${product._id}">
//                  <article>
//                      <img src="${product.imageUrl}" alt="${product.altTxt}">
//                      <h3 class="productName">${product.name}</h3>
//                      <p class="productDescription">${product.description}</p>
//                  </article>
//             </a>
//           `;
//         }
// }


