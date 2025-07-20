document.addEventListener('DOMContentLoaded', function() {
  // Notification function (no inline style, assume styling handled by CSS)
  function showCartNotification(message) {
    const notification = document.getElementById('cart-notification');
    if (notification) {
      notification.textContent = message || 'Added to cart!';
      notification.style.display = 'block';
      clearTimeout(window.cartNotifTimeout);
      window.cartNotifTimeout = setTimeout(() => {
        notification.style.display = 'none';
      }, 1500);
    }
  }

  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const productName = button.getAttribute('data-name');
      const productPrice = parseFloat(button.getAttribute('data-price'));
      const productImage = button.getAttribute('data-image');

      try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(product => product.name === productName);

      
          // Add new product to cart
          cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
        
        localStorage.setItem('cart', JSON.stringify(cart));
        showCartNotification(productName + ' added to cart!');
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    });
  });
});
