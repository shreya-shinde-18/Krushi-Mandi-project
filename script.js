// Default Crops Data
function getDefaultCrops() {
    return [
        {
            id: 'crop_1',
            name: 'Wheat',
            category: 'grains',
            price: 25,
            quantity: 1000,
            location: 'Punjab',
            imageId: '1574323347407-f5e1ad6d020b'
        },
        {
            id: 'crop_2',
            name: 'Rice',
            category: 'grains',
            price: 30,
            quantity: 800,
            location: 'West Bengal',
            imageId: '1586201375761-83865001e31c'
        },
        {
            id: 'crop_3',
            name: 'Tomato',
            category: 'vegetables',
            price: 40,
            quantity: 500,
            location: 'Maharashtra',
            imageId: '1546094096-0df4bcaaa337'
        },
        {
            id: 'crop_4',
            name: 'Potato',
            category: 'vegetables',
            price: 20,
            quantity: 1200,
            location: 'Uttar Pradesh',
            imageId: '1518977676601-b53f82aba655'
        },
        {
            id: 'crop_5',
            name: 'Carrot',
            category: 'vegetables',
            price: 35,
            quantity: 600,
            location: 'Gujarat',
            imageId: '1589927986089-35812388d1f4'
        },
        {
            id: 'crop_6',
            name: 'Onion',
            category: 'vegetables',
            price: 50,
            quantity: 900,
            location: 'Karnataka',
            imageId: '1620574387735-3624d75b2dbc'
        }
        
    ];
}

// Mandi Prices Data
function getMandiPrices() {
    return [
        { location: 'Mumbai', basePrice: 45, trend: 'up', change: 5 },
        { location: 'Delhi', basePrice: 42, trend: 'down', change: 2 },
        { location: 'Bangalore', basePrice: 48, trend: 'up', change: 8 },
        { location: 'Pune', basePrice: 40, trend: 'down', change: 3 },
        { location: 'Nashik', basePrice: 38, trend: 'up', change: 4 }
    ];
}

// Get Current User
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

// Logout Function
function logout() {
    localStorage.removeItem('currentUser');
    showToast('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Update Cart Count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = count;
    });
}

// Update Auth Button
function updateAuthButton() {
    const user = getCurrentUser();
    const authBtn = document.getElementById('authBtn');
    
    if (authBtn) {
        if (user) {
            authBtn.textContent = 'Dashboard';
            authBtn.href = getDashboardUrl(user.role);
        } else {
            authBtn.textContent = 'Login';
            authBtn.href = 'login.html';
        }
    }
}

// Get Dashboard URL based on role
function getDashboardUrl(role) {
    const dashboards = {
        'admin': 'admin-dashboard.html',
        'farmer': 'farmer-dashboard.html',
        'buyer': 'buyer-dashboard.html',
        'businessman': 'businessman-dashboard.html'
    };
    return dashboards[role] || 'index.html';
}

// Show Toast Notification
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '✓' : '✗';
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            container.removeChild(toast);
        }, 300);
    }, 3000);
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateAuthButton();
    setupMobileMenu();
});

// Initialize LocalStorage with default data if empty
function initializeDefaultData() {
    // Initialize users if empty
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }

    // Initialize sell requests if empty
    if (!localStorage.getItem('sellRequests')) {
        localStorage.setItem('sellRequests', JSON.stringify([]));
    }

    // Initialize orders if empty
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }

    // Initialize cart if empty
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

// Call initialization
initializeDefaultData();
