const head = document.querySelector('.header');
const foot = document.querySelector('.footer');
const cartItemsList = document.querySelector('#cart-items');
let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

fetch('/header.html')
    .then(res => res.text())
    .then(data => {
        head.innerHTML = data;
        const cartModal = document.querySelector('#cart-modal');
        const closeModal = document.querySelector('#close-cart-modal');
        const cartBtn = document.querySelector('.cart-button');
        const clearCartBtn = document.querySelector('#clear-cart-button');

        cartBtn.addEventListener("click", function () {
            cartModal.style.visibility = cartModal.style.visibility === "hidden" ? "visible" : "hidden";
            displayCartItems();
        });

        closeModal.addEventListener('click', function () {
            cartModal.style.visibility = cartModal.style.visibility === "hidden" ? "visible" : "hidden";
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.href === window.location.href) {
                link.setAttribute('aria-current', 'page');
            }
        });

        clearCartBtn.addEventListener('click', function clearCart() {
            cartItems = [];
            sessionStorage.removeItem('cartItems');
            displayCartItems();
            showMessage('cart cleared');
        });

           

        function displayCartItems() {
            var cartList = document.getElementById("cart-items");
            cartList.innerHTML = "";
          
            if (cartItems && cartItems.length > 0) {
              for (var i = 0; i < cartItems.length; i++) {
                var listItem = document.createElement("li");
                listItem.textContent = cartItems[i];
                cartList.appendChild(listItem);
              }
            }
          }

    });


function showMessage(message) {
    console.log(message); // You can replace this with any message display logic you have
}

function addToCart(itemName) {
    cartItems.push(itemName);
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    showMessage("Item added to the cart: " + itemName);
    updateCartItems();
}

function updateCartItems() {
    cartItemsList.innerHTML = '';
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        cartItemsList.appendChild(li);
    });
}


fetch('/footer.html')
    .then(res => res.text())
    .then(data => {
        foot.innerHTML = data;
    });

document.addEventListener("DOMContentLoaded", function () {
    const addToCartBtns = document.querySelectorAll('.add');
    addToCartBtns.forEach(button => {
        button.addEventListener("click", function () {
            const itemName = this.getAttribute("data-item");
            addToCart(itemName);
        });
    });

    updateCartItems();
});

function showHTML() {
    console.log(document.querySelector('body'));
}
showHTML();
