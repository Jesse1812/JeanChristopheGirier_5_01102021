// Récupération de l'Id de chaque canapé
const productId = getArticleId();
function getArticleId() {
  return new URL(location.href).searchParams.get('id');
}
// Récupération d'un article dans l'API
fetch(`http://localhost:3000/api/products/${productId}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    displayOneProduct(data);
  })
  .catch(function (error) {
    console.log('Une erreur est survenue.' + error);
  });
//Fonction d'affichage d'un produit
function displayOneProduct(products) {
  let product = new Canape(
    products.colors,
    products._id,
    products.name,
    products.price,
    products.imageUrl,
    products.description,
    products.altTxt
  );
  document.getElementsByClassName(
    'item__img'
  )[0].innerHTML = `<img src="${product.imageUrl}" <alt="${product.altTxt}">`;
  document.getElementById(
    'title'
  ).innerHTML = `<h1 id="title">${product.name}</h1>`;
  document.getElementById(
    'price'
  ).innerHTML = `<span id="price">${product.price}</span>`;
  document.getElementById('description').innerHTML = `<p id="description">
                  ${product.description}
                </p>`;
}
