document.addEventListener('DOMContentLoaded', () => {
    let cartItemsContainer = document.querySelector('.cart-items');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let empty = document.querySelector('.empty')
    let products = [];

    //This is the place i fetched the items form localStorage(json)
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            loadCartItems();
            updateTotalPrice();
        });

        //This is the placce i added the items html
    const loadCartItems = () => {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            let product = products.find(product => product.id == item.product_id);
            if (product) {
                let cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                    <div>${product.name}</div>
                    <div>(${item.quantity})</div>
                    <div>N${product.price * item.quantity}</div>
                `;
                cartItemsContainer.appendChild(cartItem);
            }
        });
    };


    //This is where the total item was added to cart
    const updateTotalPrice = () => {
        let total = cart.reduce((sum, item) => {
            let product = products.find(product => product.id == item.product_id);
            return sum + (product.price * item.quantity);
        }, 0);
        
        totalPriceHTML.innerText = `N${total}`;
    
        if (total === 0) {
            empty.style.display = 'block';
        } else {
            empty.style.display = 'none';
            
        };

        if(total === 0){
            totalPriceHTML.style.display = 'none';
        }
        
    };

    //In this place, the page return to home page after checkout is done.
    document.getElementById('checkout-form').addEventListener('submit', (event) => {
        event.preventDefault();
        // alert('Order placed successfully!');
        //  window.location.href = 'index.html'
        localStorage.removeItem('cart');
        window.location.href = 'successfulPage.html'; 
    });
});


