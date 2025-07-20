
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Продуктът е добавен в количката!');
}

function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const ul = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total');
    let total = 0;
    ul.innerHTML = '';

    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ${item.price} лв. <button onclick="removeFromCart(${index})">Премахни</button>`;
        ul.appendChild(li);
        total += item.price;
    });

    totalSpan.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function registerUser() {
    const email = document.getElementById('regEmail').value;
    const pass = document.getElementById('regPass').value;
    localStorage.setItem('user', JSON.stringify({ email, pass }));
    alert('Регистрацията е успешна!');
    window.location.href = 'login.html';
}

function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email === email && user.pass === pass) {
        alert('Успешен вход!');
        window.location.href = 'shop.html';
    } else {
        alert('Невалиден имейл или парола.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-items')) {
        loadCart();
    }
});
