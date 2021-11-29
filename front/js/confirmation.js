fetch('http://localhost:3000/api/products/order', {
  method: 'POST',
  body: JSON.stringify({}),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
});
