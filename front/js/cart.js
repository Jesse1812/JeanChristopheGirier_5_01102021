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
            commande[i].couleurProduit,
            i
          );
        })
        .catch(function (error) {
          console.log('Une erreur est survenue.');
          console.log(error);
        });
    }
  }
}
function displayProduct(products, quantiteProduit, couleurProduit, i) {
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
                      <input onchange="modifierProduit('${i}', this.value)" type="number" class="itemQuantity" 
                      name="itemQuantity" min="1" max="100" value="${canapeCart.quantite}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p onclick="supprimerProduit('${product.id}','${couleurProduit}')" class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
}

function modifierProduit(i, quantite) {
  commande[i].quantiteProduit = quantite;
  localStorage.setItem('commande', JSON.stringify(commande));
  displayProducts();
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
}

// Alternative suppression produit en changeant ${product.id} par i dans affichagePanier
// function supprimerProduit(i) {
//   commande.splice(i, 1);
//   localStorage.setItem('commande', JSON.stringify(commande));
//   displayProducts();
// }

// FORMULAIRE DE CONTACT //
let form = document.querySelector('.cart__order__form');
form.firstName.addEventListener('change', function () {
  validEntry(this);
});
form.lastName.addEventListener('change', function () {
  validEntry(this);
});
form.address.addEventListener('change', function () {
  validEntry(this);
});
form.city.addEventListener('change', function () {
  validEntry(this);
});
form.email.addEventListener('change', function () {
  validEmail(this);
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (
    validEntry(form.firstName) &&
    validEntry(form.lastName) &&
    validAdresse(form.address) &&
    validEntry(form.city) &&
    validEmail(form.email)
  ) {
    // ENREGISTREMENT CONTACT //
    let contact = new Contact(
      firstName.value,
      lastName.value,
      address.value,
      city.value,
      email.value
    );
    console.log(contact);
    // RECUPERATION DES ID DES PRODUITS
    const productIds = [];
    for (i = 0; i < commande.length; i++) {
      productIds.push(commande[i]);
    }
    console.log(productIds);
  }
});
// *** REGEX PRENOM NOM ADRESSE VILLE ***
const validEntry = function (inputEntry) {
  let msg;
  let valid = false;
  if (!/^[a-z ,.'-]+$/i.test(inputEntry.value)) {
    msg = 'Entrée non-valide';
  } else {
    msg = 'Entrée valide';
    valid = 'true';
  }
  let small = inputEntry.nextElementSibling;
  if (valid) {
    small.innerHTML = 'Donnée valide';
    small.classList.remove('text-danger');
    small.classList.add('text-success');
    return true;
  } else {
    small.innerHTML = 'Donnée non-valide';
    small.classList.remove('text-success');
    small.classList.add('text-danger');
    return false;
  }
};
// *** REGEX ADRESSE ***
const validAdresse = function (inputAdresse) {
  let msg;
  let valid = false;
  if (!/^[a-zA-Z0-9\s,.'-]$/.test(inputAdresse.value)) {
    msg = 'Entrée non-valide';
  } else {
    msg = 'Entrée valide';
    valid = 'true';
  }
  let small = inputAdresse.nextElementSibling;
  if (valid) {
    small.innerHTML = 'Adresse valide';
    small.classList.remove('text-danger');
    small.classList.add('text-success');
    return true;
  } else {
    small.innerHTML = 'Adresse non-valide';
    small.classList.remove('text-success');
    small.classList.add('text-danger');
    return false;
  }
};
// *** REGEX EMAIL ***
const validEmail = function (inputEmail) {
  let emailRegExp = new RegExp(
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$',
    'g'
  );
  let testEmail = emailRegExp.test(inputEmail.value);
  let small = inputEmail.nextElementSibling;
  if (testEmail) {
    small.innerHTML = 'Adresse email valide';
    small.classList.remove('text-danger');
    small.classList.add('text-success');
    return true;
  } else {
    small.innerHTML = 'Adresse email non-valide';
    small.classList.remove('text-success');
    small.classList.add('text-danger');
    return false;
  }
};
