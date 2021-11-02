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
  // Affichage options couleurs
  let panier = [];
  let choixCouleur = '';
  let choixQuantite = '';
  let value = product.colors;
  const color = document.getElementById('colors');
  for (let i = 0; i < product.colors.length; i++) {
    color.innerHTML += `
    <option value="${value[i]}">${value[i]}</option>`;
  }
  // Choix couleur
  color.addEventListener('change', function () {
    choixCouleur = color.value;
  });

  // Choix quantité
  const quantity = document.getElementById('quantity');
  quantity.addEventListener('change', function () {
    choixQuantite = quantity.value;
  });

  const shopping = document.getElementById('addToCart');
  shopping.addEventListener('click', function () {
    if (choixQuantite > 0 || choixQuantite <= 100) {
      panier.push({
        productId,
        choixCouleur,
        choixQuantite,
      });
      localStorage.setItem('commande', JSON.stringify(panier));
    }
    // Importation local Storage
    let commande = JSON.parse(localStorage.getItem(panier));
    if (
      commande.productId === panier.productId &&
      commande.choixCouleur === panier.choixCouleur
    ) {
      commande++;
      localStorage.setItem('panier', JSON.stringify(commande));
    } else {
      commande.push(panier);
      localStorage.setItem('panier', JSON.stringify(commande));
    }
  });
}
