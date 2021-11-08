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
    // Récupération du local storage sans doublon
    let commande = JSON.parse(localStorage.getItem('commande'));

    if (commande) {
      const resultFind = commande.find(
        (e) => e.productId === productId && e.choixCouleur === choixCouleur
      );
      //Si le produit commandé est déjà dans le panier
      if (resultFind) {
        let newQuantite = parseInt(
          panier.choixQuantite + resultFind.choixQuantite
        );
        resultFind.choixQuantite = newQuantite;
        console.log(newQuantite);
        localStorage.setItem('commande', JSON.stringify(commande));
        //Si le produit commandé n'est pas dans le panier
      } else {
        commande.push(panier);
        localStorage.setItem('commande', JSON.stringify(commande));
      }
      //Si le panier est vide
    } else {
      commande = [];
      commande.push(panier);
      localStorage.setItem('commande', JSON.stringify(commande));
    }

    // for (let i = 0; i < panier.length; i++) {
    //   if (
    //     commande[i].productId === panier[i].productId &&
    //     commande[i].choixCouleur === panier[i].choixCouleur
    //   ) {
    //     let addCanape =
    //       parseInt(commande[i].choixQuantite) +
    //       parseInt(panier[i].choixQuantite);
    //     commande[i].choixQuantite = addCanape;

    //     console.log(panier[i], addCanape);
    //   } else {
    //     console.log('bad news');
    //   }
    // }
    // }
    // if (commande != null) {
    //   if (commande[panier.productId] && commande[panier.choixCouleur]) {
    //     commande = {
    //       ...commande,
    //       [panier.productId]: productId,
    //     };
    //   }
    //   commande[panier.productId].choixQuantite += 1;
    // } else {
    //   console.log('pas ca');
    // }

    // Importation methode 1
    // let commande = JSON.parse(localStorage.getItem('commande'));
    // for (let i = 0; i < panier.length; i++) {
    //   if (
    //     panier[i].productId === panier[i].productId.localStorage &&
    //     panier[i].choixCouleur === panier[i].choixCouleur.localStorage
    //   ) {
    //     panier[i].choixQuantite =
    //       panier[i].choixQuantite + panier[i].choixQuantite.localStorage;
    //     localStorage.setItem('commande', JSON.stringify(panier));
    //   } else {
    //     // commande.push(panier);
    //     localStorage.setItem('commande', JSON.stringify(panier));
    //   }
    // }
    // Importation essaie methode 2
    // let commande = JSON.parse(localStorage.getItem('commande'));
    // console.log(commande);
    // let parsedValueFromString = JSON.parse(commande);
    // let panier = parsedValueFromString || [];
    // console.log(panier);
    // if (panier.indexOf(productId, choixCouleur) == -1) {
    //   commande = panier.push;
    // }
  });
  // window.alert('Vous devez entrer une quantité');
}
