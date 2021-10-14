class Canape {
  constructor(colors, id, name, price, imageUrl, description, altTxt) {
    this.colors = colors;
    this.id = id;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.altTxt = altTxt;
  }
}
fetch('http://localhost:3000/api/products')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    displayProduct(data);
  })
  .catch(function (error) {
    console.log('Une erreur est survenue.');
  });

function displayProduct(products) {
  for (let i = 0; i < products.length; i++) {
    let product = new Canape(
      products[i].colors,
      products[i]._id,
      'tataaaaaa',
      products[i].price,
      products[i].imageUrl,
      products[i].description,
      products[i].altTxt
    );
    document.getElementById(
      'items'
    ).innerHTML += `<a href="./product.html?id=${product.id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;
  }
}
