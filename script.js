const head = document.querySelector('.header');
const foot = document.querySelector('.footer');
const cartItemsList = document.querySelector('#cart-items');
const plant = document.querySelectorAll('.plant');
const product = document.querySelectorAll('.product');
const tree = document.querySelectorAll('.tree');
const accessory = document.querySelectorAll('.accessory');
const treeTab = document.getElementById('treeTab');
const plantTab = document.getElementById('plantTab');
const allTab = document.getElementById('allTab');
const accessoryTab = document.getElementById('accessoryTab');
const categoryTab = document.querySelectorAll('.category-tab');
const tabBackground = document.querySelectorAll('.tab');
const accessoryBackground = document.getElementById('accessories-tab');
const plantBackground = document.getElementById('plants-tab');
const treeBackground = document.getElementById('trees-tab');
const allBackground = document.getElementById('all-tab');
let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

fetch('/header.html')
    .then(res => res.text())
    .then(data => {
        head.innerHTML = data;
        const cartModal = document.querySelector('#cart-modal');
        const closeModal = document.querySelector('#close-cart-modal');
        const cartBtn = document.querySelector('.cart-button');
        const clearCartBtn = document.querySelector('#clear-cart-button');

        function showMessage(message){
            alert(message)
        };

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


    fetch('/footer.html')
    .then(res => res.text())
    .then(data => {
        foot.innerHTML = data;
    });

allTab.addEventListener("click", function productVisibility() {
    product.forEach(p => {
        p.style.display = p.style.display === "none" ? "block" : "block";
    });
    allBackground.style.background = allBackground.style.background === "none" ? "var(--olive-green)" : "none";
   tabBackground.forEach(b =>{
    b.style.background = b.style.background === "none" ? "var(--olive-green)" : "var(--olive-green)";
   })
});


treeTab.addEventListener("click", function productVisibility() {
    tree.forEach(p => {
      p.style.display = p.style.display === "none" ? "block" : "none";
  });
  treeBackground.style.background = treeBackground.style.background === "none" ? "var(--olive-green)" : "none";
  allBackground.style.background = "none" ;
});

accessoryTab.addEventListener("click", function productVisibility() {
    accessory.forEach(p => {
      p.style.display = p.style.display === "none" ? "block" : "none";
  });
 accessoryBackground.style.background = accessoryBackground.style.background === "none" ? "var(--olive-green)" : "none";
 allBackground.style.background = "none" ;
});
    


plantTab.addEventListener("click", function productVisibility() {
    plant.forEach(p => {
        p.style.display = p.style.display === "none" ? "block" : "none";
    });
    plantBackground.style.background = plantBackground.style.background === "none" ? "var(--olive-green)" : "none";
    allBackground.style.background = "none" ;

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
    


});


