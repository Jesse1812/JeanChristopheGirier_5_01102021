let commande = JSON.parse(localStorage.getItem('commande'));
let affichagePanier = document.getElementById('cart__item');
console.log(commande);

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

  // Si panier est vide
  if (commande == null) {
    affichagePanier.innerHTML = `<article class="cart__item">
  <div>"Le panier est vide"</div></article>`;
  } // si panier avec produit
  else {
    let quantiteTotale = 0;
    let commandeTotale = [];
    for (let i = 0; i < commande.length; i++) {
      if (
        commande[i].idProduit === commande[commande.length - 1].idProduit &&
        commande[i].couleurProduit ===
          commande[commande.length - 1].couleurProduit
      ) {
        quantiteTotale +=
          quantiteTotale + parseInt(commande[i].quantiteProduit);
        console.log(quantiteTotale);
      }

      commandeTotale.push(
        commande[i].idProduit,
        commande[i].couleurProduit,
        commande[i].imageUrl,
        commande[i].altTxt,
        commande[i].name,
        commande[i].price,
        (commande[i].quantiteProduit = quantiteTotale)
      );
      console.log(commandeTotale);
      affichagePanier.innerHTML = `<article class="cart__item" data-id="${commande[i].idProduit}">
                <div class="cart__item__img">
                  <img src="${commande[i].imageUrl}" alt="${commande[i].altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${commande[i].name}</h2>
                    <p>${commande[i].price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${commande[i].quantiteProduit}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
      console.log(commandeTotale);
    }
  }
}
