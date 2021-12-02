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
  let panier = JSON.parse(localStorage.getItem('commande'));
  if (!panier) {
    panier = [];
  }

  let value = product.colors;
  const color = document.getElementById('colors');
  const quantity = document.getElementById('quantity');
  for (let i = 0; i < product.colors.length; i++) {
    color.innerHTML += `
    <option value="${value[i]}">${value[i]}</option>`;
  }

  const shopping = document.getElementById('addToCart');
  shopping.addEventListener('click', function () {
    let produit = {
      idProduit: productId,
      couleurProduit: color.value,
      quantiteProduit: quantity.value,
    };
    if (produit.couleurProduit && produit.quantiteProduit > 0) {
      panier = managePanier(panier, produit);
      alert("L'article a été ajouté");
      localStorage.setItem('commande', JSON.stringify(panier));
    } else alert('Veuillez choisir une couleur et une quantité');
  });
}
// Cette fonction  a pour but de renvoyer le panier avec le canape,
// mais si le canape est deja présent elle va ajouter la quantité
// panier correspond au panier total
// canape correspond au produit choisit
function managePanier(panier, canape) {
  let index = panier.findIndex(function (data) {
    return (
      data.idProduit === canape.idProduit &&
      data.couleurProduit === canape.couleurProduit
    );
  });
  if (index !== -1) {
    panier[index].quantiteProduit =
      parseInt(panier[index].quantiteProduit) +
      parseInt(canape.quantiteProduit);
  } else {
    panier.push(canape);
  }
  return panier;
}
