// Global Variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentProduct = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('App initialized');
    setupEventListeners();
    renderProductsGrid();
    updateCartCount();
    setupSmoothScrolling();
    initializeInteractiveHouse();
});

// Setup Event Listeners
function setupEventListeners() {
    // Modal close on outside click
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('productModal');
        if (e.target === modal) {
            closeProductModal();
        }
    });
    
    // Navigation active state
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// Initialize Interactive House Scene
function initializeInteractiveHouse() {
    const hotspots = document.querySelectorAll('.hotspot');
    
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(hotspot.dataset.productId);
            showProductModal(productId);
            
            // Click animation
            hotspot.style.transform = 'translate(-50%, -50%) scale(0.9)';
            setTimeout(() => {
                hotspot.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 200);
        });
    });
}

// Render Products Grid
function renderProductsGrid() {
    const grid = document.getElementById('productsGrid');
    if (!grid) {
        console.error('Products grid not found');
        return;
    }
    
    grid.innerHTML = '';
    
    products.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-product-id', product.id);
    
    card.innerHTML = `
        <div class="product-image-wrapper">
            <img src="${product.image}" 
                 alt="${product.name}" 
                 class="product-image" 
                 loading="lazy"
                 onerror="this.src='https://via.placeholder.com/300x250/6366f1/ffffff?text=${encodeURIComponent(product.name)}'">
            ${product.rating ? `
                <div class="product-rating">
                    <i class="fas fa-star"></i>
                    <span>${product.rating}</span>
                    <span class="review-count">(${product.reviews})</span>
                </div>
            ` : ''}
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p class="product-description">${product.tagline}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            ${product.inStock ? 
                '<span class="in-stock"><i class="fas fa-check-circle"></i> In Stock</span>' : 
                '<span class="out-of-stock">Out of Stock</span>'}
            <button class="buy-button" onclick="event.stopPropagation(); quickBuy(${product.id})">
                <i class="fas fa-shopping-cart"></i> Quick Buy
            </button>
        </div>
    `;
    
    card.addEventListener('click', () => {
        showProductModal(product.id);
    });
    
    return card;
}

// Show Product Modal
function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">
                <div class="main-product-image">
                    <img src="${product.image}" 
                         alt="${product.name}" 
                         class="modal-product-image"
                         onerror="this.src='https://via.placeholder.com/400x400/6366f1/ffffff?text=${encodeURIComponent(product.name)}'">
                </div>
                ${product.colors ? `
                    <div class="color-options">
                        <p>Available Colors:</p>
                        <div class="color-buttons">
                            ${product.colors.map(color => `
                                <span class="color-option">${color}</span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                ${product.rating ? `
                    <div class="product-rating-detail">
                        <div class="stars">
                            ${Array(5).fill(0).map((_, i) => 
                                `<i class="fas fa-star${i < Math.floor(product.rating) ? '' : '-empty'}"></i>`
                            ).join('')}
                        </div>
                        <span>${product.rating} (${product.reviews} reviews)</span>
                    </div>
                ` : ''}
            </div>
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <p class="product-tagline">${product.tagline}</p>
                <p class="product-detail-description">${product.description}</p>
                
                <h3>Key Features</h3>
                <ul class="product-features">
                    ${product.features.map(feature => `
                        <li>
                            <i class="fas fa-check-circle"></i>
                            ${feature}
                        </li>
                    `).join('')}
                </ul>
                
                <h3>Specifications</h3>
                <ul class="product-features">
                    ${Object.entries(product.specs).map(([key, value]) => `
                        <li>
                            <i class="fas fa-microchip"></i>
                            <strong>${key}:</strong> ${value}
                        </li>
                    `).join('')}
                </ul>
                
                <div class="product-detail-price">
                    $${product.price.toFixed(2)}
                </div>
                
                ${product.inStock ? `
                    <div class="purchase-section">
                        <div class="quantity-selector">
                            <button class="quantity-btn" onclick="decreaseQuantity()">-</button>
                            <input type="number" class="quantity-input" id="quantity" value="1" min="1" max="99" readonly>
                            <button class="quantity-btn" onclick="increaseQuantity()">+</button>
                        </div>
                        
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i>
                            Add to Cart
                        </button>
                    </div>
                ` : `
                    <div class="out-of-stock-message">
                        <i class="fas fa-clock"></i>
                        Temporarily Out of Stock
                    </div>
                `}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentProduct = null;
}

// Quantity Controls
function increaseQuantity() {
    const input = document.getElementById('quantity');
    if (input) {
        input.value = parseInt(input.value) + 1;
    }
}

function decreaseQuantity() {
    const input = document.getElementById('quantity');
    if (input && parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Quick Buy
function quickBuy(productId) {
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`, 'success');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantityInput = document.getElementById('quantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`, 'success');
    closeProductModal();
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Show Cart
function showCart() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'info');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="cart-content">
            <h2>Shopping Cart</h2>
            <div class="cart-items">
                ${cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" 
                             alt="${item.name}" 
                             class="cart-item-image"
                             onerror="this.src='https://via.placeholder.com/80/6366f1/ffffff?text=Bot'">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                            <div class="cart-item-quantity">
                                <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                            </div>
                        </div>
                        <div class="cart-item-total">
                            <p>$${(item.price * item.quantity).toFixed(2)}</p>
                            <button class="remove-item" onclick="removeFromCart(${item.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="cart-summary">
                <div class="cart-total">
                    <span>Total:</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
                <button class="checkout-btn" onclick="checkout()">
                    Proceed to Checkout
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// Update Cart Item Quantity
function updateCartItemQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showCart();
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    if (cart.length === 0) {
        closeProductModal();
        showNotification('Cart is empty', 'info');
    } else {
        showCart();
    }
}

// Checkout
function checkout() {
    showNotification('Processing your order...', 'info');
    setTimeout(() => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        closeProductModal();
        showNotification('Thank you for your purchase! 🎉', 'success');
    }, 2000);
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 9999;
        animation: slideInRight 0.3s;
        pointer-events: none;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Handle Contact Submit
function handleContactSubmit(e) {
    e.preventDefault();
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    e.target.reset();
}

// Setup Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Scroll to Products
function scrollToProducts() {
    const section = document.getElementById('products');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Keyboard - ESC to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});