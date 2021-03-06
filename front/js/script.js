// Récupération des données par l'API
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
//Fonction de création et affichage des fiches canapé sur la page d'accueil
function displayProduct(products) {
  for (let i = 0; i < products.length; i++) {
    let product = new Canape(
      products[i].colors,
      products[i]._id,
      products[i].name,
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
