document.addEventListener('DOMContentLoaded', function() {
  // Get cart from local storage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Get cart list and total price elements
  const cartList = document.getElementById('cart-list');
  const totalPriceElement = document.getElementById('total-price');

  // Calculate total price
  let totalPrice = 0;

  // Display cart list and total price
  cart.forEach((product, index) => {
    const productBox = document.createElement('div');
    productBox.classList.add('product-box');
    productBox.innerHTML = `
      <img src="${product.image}" class="responsive-image">
      <div class="product-details">
        <h3>${product.name}</h3>
        <p>Price: ${product.price} RS</p>
        <p>Quantity: ${product.quantity}</p>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;
    cartList.appendChild(productBox);
    totalPrice += product.price * product.quantity;
// Add event listener to remove button
    productBox.querySelector('.remove-btn').addEventListener('click', function() {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      window.location.reload();
    });
  });

  totalPriceElement.textContent = `Total: ${totalPrice} RS`;
});

