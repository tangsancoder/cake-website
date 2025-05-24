function toggleMenu(element) {
    element.classList.toggle("active");
}
// script.js

// Function to toggle the mobile navigation menu
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Close mobile menu when a navigation link is clicked
document.querySelectorAll('.nav-menu li a').forEach(item => {
    item.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

// --- Cart Functionality ---

let cart = JSON.parse(localStorage.getItem('cakeCart')) || []; // Load cart from localStorage or start empty

// Function to update the cart display in the header
function updateCartDisplay() {
    const cartCountElement = document.querySelector('.cart-btn');
    if (cartCountElement) {
        // Calculate total items in cart (summing quantities if you add quantity logic)
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart (${totalItems})`;
    }
}

// Function to add a product to the cart
function addToCart(productName, productPrice, productId, productImage) {
    // Check if the product already exists in the cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        // If it exists, just increment the quantity
        existingItem.quantity++;
    } else {
        // If it's a new item, add it to the cart array
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cakeCart', JSON.stringify(cart));

    // Update the cart display in the header
    updateCartDisplay();

    // Provide user feedback (e.g., a simple alert or a small toast notification)
    showToast(`${productName} added to cart!`);

    console.log('Current Cart:', cart); // For debugging
}

// Function to show a temporary toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast-notification');
    toast.textContent = message;
    document.body.appendChild(toast);

    // Make the toast visible
    setTimeout(() => {
        toast.classList.add('show');
    }, 100); // Small delay to allow CSS transition

    // Hide and remove the toast after some time
    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000); // Visible for 3 seconds
}


// Event listener for "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay(); // Initialize cart display on page load

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            if (productCard) {
                const productName = productCard.querySelector('h3').textContent;
                const productPriceText = productCard.querySelector('.price').textContent;
                const productPrice = parseFloat(productPriceText.replace('$', '')); // Remove '$' and convert to number
                const productImage = productCard.querySelector('img').src;

                // Generate a simple unique ID for the product (can be improved with actual product IDs)
                const productId = productName.toLowerCase().replace(/\s/g, '-') + '-' + Math.random().toString(36).substr(2, 9);

                addToCart(productName, productPrice, productId, productImage);
            }
        });
    });
});