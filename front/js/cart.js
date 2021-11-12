let imageProduit = document.querySelector('cart__item__img');
let prixProduit = document.querySelector(
  'class="cart__item__content__titlePrice'
);
let quantiteProduit = document.querySelector(
  'cart__item__content__settings__quantity'
);
const cart = document.getElementsById('cart__items')

let commande = JSON.parse(localStorage.getItem('commande'));
function getCommande() {
  if (commande === null || commande == 0) {
    cart.innnerHTML = "<h3>Votre panier est vide<h3>"
} else {
  for(let paniers in commande) {
    let panierImg = document.createElement("div");
    productArticle.appendChild(panierImg);
    panierImg.className = "cart__item__img";
  }
}

// imageProduit.innerHTML = `<img src="../images/${product.imageUrl}" alt="Photographie d'un canapé">`;
// prixProduit.innerHTML = `<h2>${product.name}</h2><p>${product.price} €</p>`;
// quantiteProduit.innerHTML = `<p>Qté : ${quantity} </p>`;
