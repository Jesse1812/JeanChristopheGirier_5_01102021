// Constructeur d'objet Canapé
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
    displayOneProduct();
  })
  .catch(function (error) {
    console.log('Une erreur est survenue.');
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
  document.querySelector(
    '.item__img'
  ).innerHTML = `<img src="${product.imageUrl}">`;
}
