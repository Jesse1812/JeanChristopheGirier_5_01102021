let commande = JSON.parse(localStorage.getItem('commande'));
let affichagePanier = document.getElementById('cart__items');

displayProducts();

function displayProducts() {
  // si panier est vide
  if (commande == null) {
    affichagePanier.innerHTML = `<article class="cart__item">
  <div>"Le panier est vide"</div></article>`;
  } // si panier avec produit
  else {
    affichagePanier.innerHTML = '';
    for (let i = 0; i < commande.length; i++) {
      fetch(`http://localhost:3000/api/products/${commande[i].idProduit}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          data.quantiteProduit = commande[i].quantiteProduit;
          displayProduct(
            data,
            commande[i].quantiteProduit,
            commande[i].couleurProduit
          );
          console.log(data);
        })
        .catch(function (error) {
          console.log('Une erreur est survenue.');
          console.log(error);
        });
    }
  }
}
function displayProduct(products, quantiteProduit, couleurProduit) {
  let product = new Canape(
    products.colors,
    products._id,
    products.name,
    products.price,
    products.imageUrl,
    products.description,
    products.altTxt
  );
  let canapeCart = new CanapeCart(quantiteProduit, product);
  affichagePanier.innerHTML += `<article class="cart__item" data-id="${product.id}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${product.name}</h2>
                    <p>${product.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${canapeCart.quantite}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p onclick="supprimerProduit('${product.id}','${couleurProduit}')" class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
}

function supprimerProduit(nomProduit, couleurProduit) {
  let index = commande.findIndex(function (data) {
    return (
      data.idProduit === nomProduit && data.couleurProduit === couleurProduit
    );
  });
  if (index !== -1) {
    commande.splice(index, 1);
    localStorage.setItem('commande', JSON.stringify(commande));
    displayProducts();
  }
  console.log(nomProduit, couleurProduit);
}

// Modification quantité
// let modificationQuantite = document.querySelector('.itemQuantity');
// modificationQuantite.addEventListener('change', function () {});
// // Suppression produit
// let suppressionProduit = document.querySelector('.deleteItem');
// for (let j = 0; j < suppressionProduit.length; j++) {
//   suppressionProduit[j].addEventListener('click', function () {
//     let produitASupprimer = commande[j].idProduit;
//     console.log(produitASupprimer);
//     commande = commande.filter((el) => el.idProduit !== produitASupprimer);
//     localStorage.setItem('commande', JSON.stringify(panier));
//     console.log(commande);
//   });
