function showCartNotification(message) {
  const notification = document.getElementById('cart-notification');
  notification.textContent = message || 'Added to cart!';
  notification.style.display = 'block';
  clearTimeout(window.cartNotifTimeout);
  window.cartNotifTimeout = setTimeout(() => {
    notification.style.display = 'none';
  }, 1500);
}

document.addEventListener('DOMContentLoaded', function() {
  // Only attach event listeners ONCE
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const productName = button.getAttribute('data-name');
      const productPrice = parseFloat(button.getAttribute('data-price'));
      const productImage = button.getAttribute('data-image');

      // Get cart from local storage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      // Check if product already exists in cart
      const alreadyInCart = cart.some(item => item.name === productName);

      if (alreadyInCart) {
        showCartNotification(productName + " is already in cart!");
        return;
      }
      if (existingProductIndex !== -1) {
  cart[existingProductIndex].quantity += 1;
} else {
  cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
}

      // Add new product to cart (only one item per tap)
      cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      showCartNotification(productName + " added to cart!");
    }, { once: true }); // only allow one click handler per button
  });
});
