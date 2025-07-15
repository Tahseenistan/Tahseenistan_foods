const orderBtn = document.getElementById('order-btn');
const cart = JSON.parse(localStorage.getItem('cart')) || [];

orderBtn.addEventListener('click', function() {
  const productNames = cart.map(product => product.name).join('%0A'); // %0A is a newline character in URL encoding
  const whatsappNumber = '+923204176872'; // Replace with your WhatsApp number
  const message = `I'd like to order the following products:%0A${productNames}`;
  const url = `https://wa.me/${whatsappNumber}?text=${message}`;
  window.open(url, '_blank');
});
