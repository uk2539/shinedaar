const WHATSAPP = "918303085804";

// Enhanced products array with Keychains added
const products = [
    {
        name: "Gold Pearl Necklace",
        type: "Necklace",
        price: 2999,
        image: "images/necklace.jpg",
        description: "Elegant pearl necklace with 18K gold plating",
        material: "Pearl & Gold Plated",
        badge: "Bestseller"
    },
    {
        name: "Silver Drop Earrings",
        type: "Earring",
        price: 1499,
        image: "images/earring.jpg",
        description: "Minimalist silver drop earrings for everyday wear",
        material: "Sterling Silver",
        badge: "New Arrival"
    },
    {
        name: "Charm Bracelet",
        type: "Bracelet",
        price: 1299,
        image: "images/bracelet.jpg",
        description: "Adjustable charm bracelet with precious stones",
        material: "Gold Plated Brass",
        badge: "Limited Edition"
    },
    {
        name: "Minimal Ring Set",
        type: "Ring",
        price: 999,
        image: "images/ring.jpg",
        description: "Set of 3 minimalist stacking rings",
        material: "Sterling Silver",
        badge: "Popular"
    },
    {
        name: "Diamond Solitaire Necklace",
        type: "Necklace",
        price: 4999,
        image: "images/necklace2.jpg",
        description: "Classic diamond solitaire pendant",
        material: "Gold & Diamond",
        badge: "Premium"
    },
    {
        name: "Hoop Earrings",
        type: "Earring",
        price: 899,
        image: "images/earring2.jpg",
        description: "Classic gold hoop earrings",
        material: "Gold Plated",
        badge: "Trending"
    },
    {
        name: "Tennis Bracelet",
        type: "Bracelet",
        price: 3999,
        image: "images/bracelet2.jpg",
        description: "Elegant tennis bracelet with crystals",
        material: "Silver & Crystal",
        badge: "Luxury"
    },
    {
        name: "Statement Ring",
        type: "Ring",
        price: 1999,
        image: "images/ring2.jpg",
        description: "Bold statement ring with blue stone",
        material: "Gold Plated & Stone",
        badge: "Exclusive"
    },
    // KEYCHAINS ADDED
    {
        name: "Golden Keychain Charm",
        type: "Keychain",
        price: 699,
        image: "images/keychain1.jpg",
        description: "Elegant golden keychain with charm",
        material: "Gold Plated Metal",
        badge: "New"
    },
    {
        name: "Crystal Keychain Set",
        type: "Keychain",
        price: 1299,
        image: "images/keychain2.jpg",
        description: "Set of 3 crystal keychains with custom initials",
        material: "Crystal & Silver",
        badge: "Personalized"
    },
    {
        name: "Leather Keychain",
        type: "Keychain",
        price: 899,
        image: "images/keychain3.jpg",
        description: "Premium leather keychain with metal details",
        material: "Leather & Brass",
        badge: "Classic"
    },
    {
        name: "Gemstone Keychain",
        type: "Keychain",
        price: 999,
        image: "images/keychain4.jpg",
        description: "Keychain with natural gemstone pendant",
        material: "Gemstone & Sterling Silver",
        badge: "Natural"
    }
];

let activeType = "All";

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.querySelectorAll('span')[0].style.transform = 'none';
                navToggle.querySelectorAll('span')[1].style.opacity = '1';
                navToggle.querySelectorAll('span')[2].style.transform = 'none';
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }
    
    // Navbar scroll effect - Enhanced glass effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
            // Increase blur effect as we scroll
            navbar.style.backdropFilter = `blur(${15 + (scrollPosition / 100)}px) saturate(200%)`;
            navbar.style.webkitBackdropFilter = `blur(${15 + (scrollPosition / 100)}px) saturate(200%)`;
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backdropFilter = 'blur(15px) saturate(180%)';
            navbar.style.webkitBackdropFilter = 'blur(15px) saturate(180%)';
        }
        
        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (scrollPosition > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Parallax effect for hero glass
        const heroGlass = document.querySelector('.hero-glass');
        if (heroGlass) {
            heroGlass.style.transform = `translateY(${scrollPosition * 0.05}px)`;
        }
    });
    
    // Back to top functionality
    const backToTop = document.querySelector('.back-to-top');
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                const msg = encodeURIComponent(`New newsletter subscription: ${email}`);
                window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
                emailInput.value = '';
                showNotification('Thank you for subscribing! We\'ll contact you shortly.', 'success');
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Image loading error handling
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG' && e.target.classList.contains('product-img')) {
            e.target.src = 'https://via.placeholder.com/400x400/FFFBF0/D4AF37?text=Jewelry+Image';
            e.target.alt = 'Image coming soon';
        }
    }, true);
    
    // Filter button animations
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Initial render
    renderProducts();
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? 'rgba(37, 211, 102, 0.9)' : 'rgba(231, 76, 60, 0.9)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        animation: slideIn 0.3s ease-out;
        max-width: 350px;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function renderProducts() {
    const grid = document.getElementById("products-grid");
    const filteredProducts = products.filter(p => 
        activeType === "All" || p.type === activeType
    );
    
    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try selecting a different category</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filteredProducts.map(p => {
        const msg = encodeURIComponent(`Hi, I'm interested in your "${p.name}" - ₹${p.price}\n\nDescription: ${p.description}\nMaterial: ${p.material}\n\nPlease send me more details!`);
        
        // Determine icon based on product type
        let icon = 'fa-gem';
        if (p.type === 'Earring') icon = 'fa-moon';
        if (p.type === 'Bracelet') icon = 'fa-heart';
        if (p.type === 'Ring') icon = 'fa-circle';
        if (p.type === 'Keychain') icon = 'fa-key';
        
        return `
        <div class="product-card">
            <div class="product-image">
                <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy">
                ${p.badge ? `<span class="product-badge"><i class="fas ${icon}"></i> ${p.badge}</span>` : ''}
            </div>
            <div class="product-content">
                <h3 class="product-title">${p.name}</h3>
                <p class="product-description">${p.description}</p>
                <div class="product-details">
                    <p class="product-material"><i class="fas fa-tag"></i> ${p.material}</p>
                    <p class="product-type"><i class="fas ${icon}"></i> ${p.type}</p>
                </div>
                <p class="product-price">₹${p.price.toLocaleString()}</p>
                <a class="product-btn" href="https://wa.me/${WHATSAPP}?text=${msg}" target="_blank">
                    <i class="fab fa-whatsapp"></i>
                    Order on WhatsApp
                </a>
            </div>
        </div>
        `;
    }).join('');
    
    // Add CSS for product details
    const style = document.createElement('style');
    style.textContent = `
        .product-details {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            font-size: 14px;
            color: var(--text-light);
        }
        .product-details i {
            margin-right: 5px;
            color: var(--primary-gold);
        }
        .product-material, .product-type {
            display: flex;
            align-items: center;
            margin: 0;
        }
    `;
    if (!document.querySelector('style[data-product-details]')) {
        style.setAttribute('data-product-details', '');
        document.head.appendChild(style);
    }
}

function filterType(t, btn) {
    activeType = t;
    
    // Update active button with animation
    document.querySelectorAll(".category-btn").forEach(x => {
        x.classList.remove("active");
        x.style.transform = 'translateY(0) scale(1)';
    });
    btn.classList.add("active");
    btn.style.transform = 'translateY(-2px) scale(1.02)';
    
    // Update nav link if needed
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.textContent.includes('Shop')) {
            link.classList.add('active');
        } else if (!link.textContent.includes('Shop')) {
            link.classList.remove('active');
        }
    });
    
    // Add loading effect
    const grid = document.getElementById("products-grid");
    grid.style.opacity = '0.5';
    grid.style.transition = 'opacity 0.3s';
    
    setTimeout(() => {
        renderProducts();
        grid.style.opacity = '1';
    }, 300);
    
    // Scroll to products on mobile
    if (window.innerWidth < 768) {
        setTimeout(() => {
            document.getElementById('products').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 400);
    }
}

// Optional: Add smooth loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s';
});