let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
<<<<<<< HEAD
let totalPriceHTML = document.querySelector('.totalPrice');
=======
let totalPriceHTML = document.querySelector('.totalPrice'); // Add this element in your HTML
>>>>>>> cf05847c6d257e3bb1ae7518175de645960cf43c
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
<<<<<<< HEAD
    // Adjust container position when cart is shown
    if (body.classList.contains('showCart')) {
        document.querySelector(".container").style.transform = "translateX(-250px)";
    } else {
        document.querySelector(".container").style.transform = "translateX(0)";
    }
=======
    // body.classList.toggle('cart-show');
});

closeCart.addEventListener('mouseenter', () => {
    body.classList.toggle('showCart');
>>>>>>> cf05847c6d257e3bb1ae7518175de645960cf43c
});

closeCart.addEventListener('click', () => {
    body.classList.remove('showCart');
    document.querySelector(".container").style.transform = "translateX(0)";
});

const addDataToHTML = () => {
<<<<<<< HEAD
    if (products.length > 0) {
=======
    if(products.length > 0) {
>>>>>>> cf05847c6d257e3bb1ae7518175de645960cf43c
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = 
<<<<<<< HEAD
            `<a href="detail-page.html?id=${product.id}" class="product-link">
                <img src="${product.image}" alt="${product.name}">
            </a>
            <h2>${product.name}</h2>
            <div class="star-things">
                <img class="star-icon" src="${product.starImage}">
                <div class="star-unit">${product.starUnit}</div>
=======
            `<img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <div class="star-things">
            <img class="star-icon" src="${product.starImage}">
            <div class="star-unit">${product.starUnit}</div>
>>>>>>> cf05847c6d257e3bb1ae7518175de645960cf43c
            </div>
            <div class="price">₦${product.price}</div>
            <button class="addCart">Add To Cart</button>`;

            listProductHTML.appendChild(newProduct);
        });
    }
};

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
<<<<<<< HEAD
    if (positionClick.classList.contains('addCart')) {
=======
    if(positionClick.classList.contains('addCart')){
>>>>>>> cf05847c6d257e3bb1ae7518175de645960cf43c
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
});

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
<<<<<<< HEAD
    } else if (positionThisProductInCart < 0) {
=======
    } else if(positionThisProductInCart < 0){
>>>>>>> cf05847c6d257e3bb1ae7518175de645960cf43c
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
    getTotalPrice();
};

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
<<<<<<< HEAD
            totalQuantity += item.quantity;
=======
            totalQuantity = totalQuantity + item.quantity;
>>>>>>> cf05847c6d257e3bb1ae7518175de645960cf43c
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem); 
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}" >
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">₦${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus">+</span>
                </div>
                
            `;
<<<<<<< HEAD
            
=======
>>>>>>> cf05847c6d257e3bb1ae7518175de645960cf43c
        });
    }
    iconCartSpan.innerText = totalQuantity;
    getTotalPrice();
};

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
});

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
    getTotalPrice();
};

const getTotalPrice = () => {
    let total = 0;
    cart.forEach(item => {
        let positionProduct = products.findIndex((value) => value.id == item.product_id);
        let info = products[positionProduct];
        total += info.price * item.quantity;
    });
<<<<<<< HEAD
    

    if(total === 0){
        totalPriceHTML.innerText ="Your Cart is Empty"
    }else {
        totalPriceHTML.innerText = `Total Price: ₦${total}`;
    }
    
};
=======
    totalPriceHTML.innerText = `Total Price: ₦${total}`;
};

>>>>>>> cf05847c6d257e3bb1ae7518175de645960cf43c

const initApp = () => {
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

<<<<<<< HEAD
        if (localStorage.getItem('cart')) {
=======
        if(localStorage.getItem('cart')){
>>>>>>> cf05847c6d257e3bb1ae7518175de645960cf43c
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    });
};

initApp();
