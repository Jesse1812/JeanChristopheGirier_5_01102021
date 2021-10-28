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

  // Choix produit
  let ref = localStorage.setItem('id', productId);
  // Choix couleurs
  let value = product.colors;
  for (let i = 0; i < product.colors.length; i++) {
    let select = document.querySelector('select');
    select.innerHTML += `
    <option value="${value[i]}">${value[i]}</option>`;
    select.addEventListener('click', function (e) {
      e.value = this.value;
      let couleur = localStorage.setItem('color', this.value);
    });
  }
  // Choix quantité
  let quantity = document.querySelector('input');
  quantity.addEventListener('click', function (q) {
    q.value = this.value;
    let quantite = localStorage.setItem('quantity', this.value);
  });

  const commande = document.getElementById('addToCart');
  commande.addEventListener('click', function () {
    let panier = [];
    if (color && quantity) {
      panier.push({
        productId,
        color,
        quantity,
      });
    }
    localStorage.setItem('panier', JSON.stringify(panier));
    console.log(panier);
  });
}
