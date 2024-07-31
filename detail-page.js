document.addEventListener('DOMContentLoaded', () => {
    // Define the global variables
    let iconCart = document.querySelector('.icon-cart');
    let iconCartSpan = document.querySelector('.icon-cart span');
    let totalPriceHTML = document.querySelector('.total-price');
    let body = document.querySelector('body');
    let closeCart = document.querySelector('.close');
    let listCartHTML = document.querySelector('.listCart');
    let products = [];
    let cart = [];
  
    // Get the product ID from the URL query parameter
    const getQueryParam = (name) => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    };
  
    const productId = parseInt(getQueryParam('id'), 10); // Convert the ID to an integer
  
    // Fetch JSON data from the 'products.json' file
    fetch('products.json')
      .then(response => response.json())
      .then(data => {
        // Store products in a global variable
        products = data;
  
        // Find the product with the specified ID in the data
        const product = data.find(item => item.id === productId);
        // Check if the product exists
        if (product) {
          // If product is found, display the product details
          displayProduct(product);
        } else {
          // If product is not found, display an error message
          document.getElementById('product').innerHTML = 'Product not found';
        }
  
        // Initialize cart from local storage
        if (localStorage.getItem('cart')) {
          cart = JSON.parse(localStorage.getItem('cart'));
          updateCartIcon(); // Update cart icon span with the number of items
          addCartToHTML();
          getTotalPrice();
        }
      })
      .catch(error => {
        // Handle errors if the fetch fails
        console.error('Error fetching product data:', error);
        document.getElementById('product').innerHTML = 'Error loading product data';
      });
  
    // Function to display a single product's details
    function displayProduct(product) {
      // Get the container element where the product details will be displayed
      const productContainer = document.getElementById('product');
      // Set the inner HTML of the container with the product details
      productContainer.innerHTML = `
        
        <div class="product-link">
          <a href="image.html?id=${product.id}">
            <img src="${product.image}" alt="${product.name}">
          </a>
          <h2>${product.name}</h2>
        </div>
        <p class="price">₦${product.price}</p>
        <div class="star-container">
          <img src="${product.starImage}" alt="Star Rating">
          <span class="star-unit">${product.starUnit}</span>
        </div>
        <button class="addCart" data-id="${product.id}">Add To Cart</button>

        <div class="details">
         <h3 class="product-detail-name">More about ${product.name}</h3>
        <h4>
        ${product.detail} 
        </h4>
        <p class="key-feature-paragraph">key Features</p>
        <h4 class="keyfeatures">${product.keyFeatures} </h4>
        <p class="key-feature-paragraph">Perfect For:</p>
        <h4 class="keyfeatures">${product.perferctFor} </h4>

         
         
         
        
        
        
        
        </div>
      `;
  
      // Add event listener to the 'Add To Cart' button
      document.querySelector('.addCart').addEventListener('click', () => {
        addToCart(product.id);
      });
    }
  
    const addToCart = (product_id) => {
      let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
      if (cart.length <= 0) {
        cart = [{
          product_id: product_id,
          quantity: 1
        }];
      } else if (positionThisProductInCart < 0) {
        cart.push({
          product_id: product_id,
          quantity: 1
        });
      } else {
        cart[positionThisProductInCart].quantity += 1;
      }
      addCartToMemory();
      addCartToHTML();
      getTotalPrice();
      updateCartIcon(); // Update cart icon span with the number of items
    };
  
    const updateCartIcon = () => {
      let totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
      iconCartSpan.innerText = totalQuantity;
    };
  
    const addCartToMemory = () => {
      localStorage.setItem('cart', JSON.stringify(cart));
    };
  
    const addCartToHTML = () => {
      listCartHTML.innerHTML = '';
      let totalQuantity = 0;
      if (cart.length > 0) {
        cart.forEach(item => {
          totalQuantity += item.quantity;
          let newItem = document.createElement('div');
          newItem.classList.add('item');
          newItem.dataset.id = item.product_id;
  
          let positionProduct = products.findIndex((value) => value.id == item.product_id);
          let info = products[positionProduct];
          listCartHTML.appendChild(newItem);
          newItem.innerHTML = `
            <div class="image">
              <img src="${info.image}" alt="${info.name}">
            </div>
            <div class="name">
              ${info.name}
            </div>
            <div class="totalPrice">₦${info.price * item.quantity}</div>
            <div class="quantity">
              <span class="minus">-</span>
              <span>(${item.quantity})</span>
              <span class="plus">+</span>
            </div>
          `;
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
            cart[positionItemInCart].quantity += 1;
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
      totalPriceHTML.innerText = `Total Price: ₦${total}`;
    };


  
    closeCart.addEventListener('mouseenter', () => {
      body.classList.toggle('showCart');
    });
  
    iconCart.addEventListener('click', () => {
      body.classList.toggle('showCart');
    });
  
    if (document.body.classList.contains('showCart')) {
      document.querySelector('.container').style.right = '-200px';
    }
  });
  
