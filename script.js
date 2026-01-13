let products = [
    { id: 1, name: "Headphones", price: 3500, cat: "Electronics", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", rating: 5 },
    { id: 2, name: "Casual Shirt", price: 1500, cat: "Clothes", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400", rating: 4 },
    { id: 3, name: "Sneakers", price: 4200, cat: "Shoes", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", rating: 5 }
];

let cart = [];

// Navigation & Mobile Menu
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.getElementById('navLinks').classList.remove('active'); // Close menu on click
    window.scrollTo(0,0);
    if(pageId === 'products') renderProducts(products);
}

// Render Products
function renderProducts(arr) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = arr.map(p => `
        <div class="card">
            <img src="${p.img}" onclick="viewProduct(${p.id})">
            <h4>${p.name}</h4>
            <p class="price">KES ${p.price}</p>
            <p style="font-size:0.7rem">⭐ ${p.rating}.0</p>
            <button class="btn block" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Single Product Page
function viewProduct(id) {
    const p = products.find(x => x.id === id);
    document.getElementById('productDetails').innerHTML = `
        <div class="card" style="text-align:left">
            <img src="${p.img}" style="height:auto; max-height:300px">
            <h2 style="margin-top:15px">${p.name}</h2>
            <p class="price" style="font-size:1.5rem">KES ${p.price}</p>
            <p>Category: ${p.cat}</p>
            <p style="margin:15px 0">High quality ${p.name} available at NCN SHOP. Order now for fast delivery.</p>
            <button class="btn block" onclick="addToCart(${p.id})">Add to Cart</button>
            <button class="btn block" style="background:#2c3e50" onclick="showPage('checkout')">Buy It Now</button>
        </div>
    `;
    showPage('single-product');
}

// Search
function searchProduct() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
    showPage('products');
}

// Cart Management
function addToCart(id) {
    const p = products.find(x => x.id === id);
    cart.push(p);
    updateCart();
    alert("Added to cart!");
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
    let total = 0;
    document.getElementById('cartItems').innerHTML = cart.map((item, idx) => {
        total += item.price;
        return `
            <div style="display:flex; gap:10px; align-items:center; margin-bottom:10px; background:#f9f9f9; padding:10px; border-radius:5px;">
                <img src="${item.img}" width="50" height="50" style="object-fit:cover">
                <div style="flex:1"><b>${item.name}</b><br>KES ${item.price}</div>
                <button onclick="removeFromCart(${idx})" style="color:red; border:none; background:none">Remove</button>
            </div>
        `;
    }).join('');
    document.getElementById('totalPrice').innerText = total;
}

function removeFromCart(idx) {
    cart.splice(idx, 1);
    updateCart();
}

// Order Logic
function confirmOrder(e) {
    e.preventDefault();
    document.getElementById('orderPopup').style.display = 'flex';
    cart = [];
    updateCart();
}

function closePopup() {
    document.getElementById('orderPopup').style.display = 'none';
    showPage('home');
}

// Admin Logic
function adminAdd() {
    const name = document.getElementById('adminName').value;
    const price = document.getElementById('adminPrice').value;
    const img = document.getElementById('adminImg').value;
    if(name && price && img) {
        products.push({ id: Date.now(), name, price: parseInt(price), cat: "New", img, rating: 5 });
        alert("Product Uploaded!");
        showPage('products');
    }
}

// Run on load
renderProducts(products);