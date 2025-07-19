// This script adds a product to the cart ONLY ONCE per button tap.
// It does NOT increment quantity or add duplicates.
// It does NOT display notifications (add that if you wish).

document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  if (addToCartButtons.length === 0) {
    console.log('No add to cart buttons found!');
  } else {
    console.log('Add to cart buttons found!');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        console.log('Add to cart button clicked!');
        event.preventDefault();
        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));
        const productImage = button.getAttribute('data-image');

        console.log(`Product Name: ${productName}, Price: ${productPrice}, Image: ${productImage}`);

        try {
          // Get cart from local storage
          const cart = JSON.parse(localStorage.getItem('cart')) || [];

          // Check if product already exists in cart
          const alreadyInCart = cart.some(product => product.name === productName);

          if (alreadyInCart) {
            console.log(productName + ' is already in cart!');
            return; // Do not add again
          } else {
            // Add new product to cart (only one item per tap)
            cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('Product added to cart!');
          }
        } catch (error) {
          console.error('Error adding product to cart:', error);
        }
      });
    });
  }
});
