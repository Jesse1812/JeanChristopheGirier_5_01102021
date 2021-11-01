let imageProduit = document.querySelector('cart__item__img');
let prixProduit = document.querySelector(
  'class="cart__item__content__titlePrice'
);
let quantiteProduit = document.querySelector(
  'cart__item__content__settings__quantity'
);

imageProduit.innerHTML = `<img src="../images/${product.imageUrl}" alt="Photographie d'un canapé">`;
prixProduit.innerHTML = `<h2>${product.name}</h2><p>${product.price} €</p>`;
quantiteProduit.innerHTML = `<p>Qté : ${quantity} </p>`;
