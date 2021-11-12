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
    //   panier.push({
    //     productId,
    //     choixCouleur,
    //     choixQuantite
    //   });
    //   console.log(panier);
    // localStorage.setItem('commande', JSON.stringify(panier));

    let produit = {
      idProduit: productId,
      couleurProduit: choixCouleur,
      quantiteProduit: choixQuantite,
    };
    panier.push(produit);
    console.log(panier);
    localStorage.setItem('commande', JSON.stringify(panier));
    // Récupération du local storage sans doublon
    let commande = JSON.parse(localStorage.getItem('commande'));
    if (commande) {
      const resultFind = panier.find(
        (e) => e.idProduit === productId && e.couleurProduit === choixCouleur
      );
      console.log(resultFind);
      //Si le produit commandé est déjà dans le panier
      if (resultFind) {
        let newQuantite = parseInt(
          panier.choixQuantite + resultFind.choixQuantite
        );
        console.log(newQuantite);
        resultFind.choixQuantite = newQuantite;

        localStorage.setItem('commande', JSON.stringify(panier));

        //Si le produit commandé n'est pas dans le panier
      } else {
        commande.push(panier);
        localStorage.setItem('commande', JSON.stringify(panier));
      }
      //Si le panier est vide
    } else {
      console.log('nooooo');
      commande = [];
      commande.push(panier);
      localStorage.setItem('commande', JSON.stringify(panier));
    }

    // let alreadyThere = false;
    // let modification;
    // for (produit of panier) {
    //   const resultFind = panier.find(
    //     (e) => e.idProduit === productId && e.couleurProduit === choixCouleur
    //   );
    //   if (resultFind) {
    //     alreadyThere = true;
    //     modification = panier.indexOf(produit);
    //     console.log(commande);
    //   }
    // }
    // console.log(modification);
    // if (alreadyThere) {
    //   panier[modification].quantiteProduit =
    //     panier[modification].quantiteProduit +
    //     produit[modification].quantiteProduit;
    // } else {
    //   console.log('babababa');
    // }
  });
  // window.alert('Vous devez entrer une quantité');
}
