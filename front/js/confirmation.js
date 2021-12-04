// Récupération et Affichage du numero de commande
function getNumber() {
  return new URL(location.href).searchParams.get('orderId');
}
const numeroCommande = document.getElementById('orderId');
numeroCommande.innerHTML = getNumber();
