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

  //   let ref = localStorage.setItem('id', productId);
  // Affichage options couleurs
  let value = product.colors;
  const color = document.getElementById('colors');
  for (let i = 0; i < product.colors.length; i++) {
    color.innerHTML += `
    <option value="${value[i]}">${value[i]}</option>`;
  }
  // Choix couleur
  color.addEventListener('change', function () {
    let choixCouleur = color.value;
    console.log(choixCouleur);
  });
}
// Choix quantité
const quantity = document.getElementById('quantity');
quantity.addEventListener('change', function () {
  let choixQuantite = quantity.value;
  // q.value = this.value;
  // let quantite = localStorage.setItem('quantity', this.value);
  // let choixQuantite = quantity.value;
  console.log(choixQuantite);
});

//   const shopping = document.getElementById('addToCart');
//   let panier = [];
//   shopping.addEventListener('click', function () {
//     panier.push({
//       productId,
//       color,
//       quantity,
//     });

//     let commande = JSON.parse(localStorage.getItem(panier));
//     console.log(commande);
//     if (commande) {
//       commande.push(panier);
//       localStorage.setItem('panier', JSON.stringify(commande));
//     } else {
//       commande = [];
//       commande.push(panier);
//       localStorage.setItem('panier', JSON.stringify(commande));
//     }
//     // if (
//     //   panier.productId === panier &&
//     //   panier.color === panier.color['panier']
//     // ) {
//     //   panier.quantity++;
//     //   localStorage.setItem('panier', JSON.stringify(panier));
//     // } else {
//     //   localStorage.setItem('panier', JSON.stringify(panier));
//     //   console.log(panier);
//     // }
//   });
//   // Récupération du panier
// }
