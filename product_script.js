document.addEventListener('DOMContentLoaded', function() {
  // Notification function (notification div must exist and be styled in CSS)
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
        // Get cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Try to find the product in cart by name
        let product = cart.find(item => item.name === productName);

        if (product) {
          // If found, increase quantity
          product.quantity += 1;
        } else {
          // If not found, add new product with quantity 1
          cart.push({
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
          });
        }

        // Save cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        showCartNotification(productName + " added to cart!");

        // Trigger any custom event to re-render cart if needed
        document.dispatchEvent(new CustomEvent('cartUpdated'));
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    });
  });
});
