class canape {
  constructor() {
    this.colors = colors;
    this._id = id;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.altTxt = altTxt;
  }
}
const retrieveData = () => fetch("http://localhost:3000/api/products")
.then(function (res) {
  if (res.ok) {
    return (res.json())
  }
})
.then(getProduct (value) {
  document.getElementById("items").innertext = listOfProducts
})
.catch(function (err) {
  console.log("Une erreur est survenue")
});

function getProduct() {
  let listOfProducts ="";
    for(let i = 0; i < retrieveData.length; i++) {
     listOfProducts = new canape();
    }
    
}
