fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((response) => {
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
            </a>`;
    }
  })

  .catch(function () {
    alert("fetch Error");
    console.log("fetch error")
  });
