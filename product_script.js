document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    // Remove any previous listeners (defensive, not strictly needed unless you attach elsewhere too)
    button.replaceWith(button.cloneNode(true));
  });

  // Re-select buttons after clone
  const freshButtons = document.querySelectorAll('.add-to-cart-btn');
  freshButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const productName = button.getAttribute('data-name');
      const productPrice = parseFloat(button.getAttribute('data-price'));
      const productImage = button.getAttribute('data-image');

      try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(product => product.name === productName);

        if (existingProductIndex !== -1) {
          cart[existingProductIndex].quantity += 1;
        } else {
          cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Product added to cart!');
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    });
  });
});
