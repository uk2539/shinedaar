const WHATSAPP = "918303085804";

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

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', !isExpanded);
            
            const spans = navToggle.querySelectorAll('span');
            if (!isExpanded) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans.forEach(span => span.style.cssText = '');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.querySelectorAll('span').forEach(span => span.style.cssText = '');
                document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        navbar?.classList.toggle('scrolled', scrollY > 50);
        backToTop?.classList.toggle('visible', scrollY > 300);
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = e.target.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                const msg = `New newsletter subscription: ${email}`;
                window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
                emailInput.value = '';
                showNotification('Thank you for subscribing!', 'success');
            } else {
                showNotification('Please enter a valid email.', 'error');
            }
        });
    }

    document.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG' && e.target.classList.contains('product-img')) {
            e.target.src = 'https://via.placeholder.com/400x400/FFFBF0/D4AF37?text=Jewelry+Image';
            e.target.alt = 'Image unavailable';
        }
    }, true);

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            activeType = btn.dataset.filter;
            renderProducts();
            
            if (window.innerWidth < 768) {
                setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 400);
            }
        });
    });

    renderProducts();
});

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type) {
    const div = document.createElement('div');
    div.className = `notification ${type}`;
    div.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
    div.style.cssText = `
        position: fixed; top: 100px; right: 20px; padding: 14px 20px;
        background: ${type === 'success' ? 'rgba(37, 211, 102, 0.95)' : 'rgba(231, 76, 60, 0.95)'};
        color: white; border-radius: 10px; display: flex; align-items: center; gap: 10px;
        z-index: 10000; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.25);
        animation: fadeIn 0.3s, fadeOut 0.3s 2.7s forwards;
        max-width: 320px; font-family: 'Inter', sans-serif;
    `;
    
    if (!document.getElementById('notif-styles')) {
        const style = document.createElement('style');
        style.id = 'notif-styles';
        style.textContent = `
            @keyframes fadeIn { from { opacity:0; transform: translateX(100%); } to { opacity:1; transform: translateX(0); } }
            @keyframes fadeOut { from { opacity:1; transform: translateX(0); } to { opacity:0; transform: translateX(100%); } }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    grid.classList.add('loading');
    
    setTimeout(() => {
        const filtered = products.filter(p => activeType === "All" || p.type === activeType);
        
        if (filtered.length === 0) {
            grid.innerHTML = `<div class="no-products"><i class="fas fa-search"></i><h3>No products found</h3><p>Try another category</p></div>`;
        } else {
            grid.innerHTML = filtered.map(p => {
                const iconMap = {
                    Earring: 'fa-moon',
                    Bracelet: 'fa-heart',
                    Ring: 'fa-circle',
                    Keychain: 'fa-key'
                };
                const icon = iconMap[p.type] || 'fa-gem';
                const msg = `Hi, I'm interested in "${p.name}" (₹${p.price})\n\nDescription: ${p.description}\nMaterial: ${p.material}\n\nPlease share more details!`;
                
                return `
                <div class="product-card" role="article">
                    <div class="product-image">
                        <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy" decoding="async">
                        ${p.badge ? `<span class="product-badge"><i class="fas ${icon}"></i> ${p.badge}</span>` : ''}
                    </div>
                    <div class="product-content">
                        <h3 class="product-title">${p.name}</h3>
                        <p class="product-description">${p.description}</p>
                        <p class="product-material"><i class="fas fa-tag"></i> ${p.material}</p>
                        <p class="product-price">₹${p.price.toLocaleString()}</p>
                        <a href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}" 
                           target="_blank" rel="noopener" 
                           class="product-btn" aria-label="Order ${p.name} on WhatsApp">
                            <i class="fab fa-whatsapp" aria-hidden="true"></i> Order on WhatsApp
                        </a>
                    </div>
                </div>`;
            }).join('');
        }
        
        grid.classList.remove('loading');
    }, 150);
}
