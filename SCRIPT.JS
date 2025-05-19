document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountSpan = document.getElementById('cart-count');
    const totalPriceSpan = document.getElementById('total-price');

    let cart = [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-price">R$ ${item.price.toFixed(2)}</p>
                </div>
                <div class="quantity-controls">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">Remover</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
            total += item.price * item.quantity;
        });
        cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        totalPriceSpan.textContent = total.toFixed(2);

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        }

        // Adicionar event listeners aos botões de quantidade e remover
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }

    function addItemToCart(event) {
        const productItem = event.target.closest('.product-item');
        const id = parseInt(productItem.dataset.id);
        const name = productItem.dataset.name;
        const price = parseFloat(productItem.dataset.price);
        const image = productItem.dataset.image;

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, image, quantity: 1 });
        }
        updateCartDisplay();
    }

    function decreaseQuantity(event) {
        const id = parseInt(event.target.dataset.id);
        const item = cart.find(item => item.id === id);
        if (item && item.quantity > 1) {
            item.quantity--;
            updateCartDisplay();
        }
    }

    function increaseQuantity(event) {
        const id = parseInt(event.target.dataset.id);
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity++;
            updateCartDisplay();
        }
    }

    function removeItem(event) {
        const id = parseInt(event.target.dataset.id);
        cart = cart.filter(item => item.id !== id);
        updateCartDisplay();
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addItemToCart);
    });

    updateCartDisplay(); // Inicializar a exibição do carrinho
});