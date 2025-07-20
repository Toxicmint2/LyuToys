
// --- Регистрация ---
function registerUser() {
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const pass1 = document.getElementById("regPass1").value;
    const pass2 = document.getElementById("regPass2").value;

    if (pass1 !== pass2) {
        alert("Паролите не съвпадат.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[email]) {
        alert("Този имейл вече е регистриран.");
        return;
    }

    users[email] = { name, password: pass1 };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Успешна регистрация. Влез сега.");
    window.location.href = "login.html";
}

// --- Вход ---
function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPass").value;

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (!users[email] || users[email].password !== pass) {
        alert("Грешен имейл или парола.");
        return;
    }

    localStorage.setItem("loggedUser", email);
    alert("Добре дошъл!");
    window.location.href = "index.html";
}

// --- Проверка дали е логнат ---
function getLoggedUser() {
    return localStorage.getItem("loggedUser");
}

// --- Зареждане на количка ---
function loadCart() {
    const email = getLoggedUser();
    if (!email) {
        document.getElementById("cart-items").innerHTML = "<p>Моля, <a href='login.html'>влез в акаунта си</a>, за да виждаш количката.</p>";
        return;
    }

    const allCarts = JSON.parse(localStorage.getItem("carts") || "{}");
    const cart = allCarts[email] || [];
    const list = document.getElementById("cart-items");
    const total = document.getElementById("total");
    const cartInput = document.getElementById("cart-input");

    list.innerHTML = "";
    let sum = 0;
    let summary = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.name} - ${item.price} лв. 
        <button onclick="removeFromCart(${index})">Премахни</button>`;
        list.appendChild(li);
        sum += item.price;
        summary += `${item.name} - ${item.price} лв.\\n`;
    });

    total.textContent = "Общо: " + sum.toFixed(2) + " лв.";
    if (cartInput) {
        cartInput.value = summary + "\\nОбщо: " + sum.toFixed(2) + " лв.";
    }
}

// --- Добавяне в количката ---
function addToCart(name, price) {
    const email = getLoggedUser();
    if (!email) {
        alert("Трябва да влезеш в акаунта си, за да добавиш продукти.");
        window.location.href = "login.html";
        return;
    }

    const allCarts = JSON.parse(localStorage.getItem("carts") || "{}");
    if (!allCarts[email]) allCarts[email] = [];
    allCarts[email].push({ name, price });
    localStorage.setItem("carts", JSON.stringify(allCarts));
    alert("Продуктът е добавен в количката.");
}

// --- Премахване от количка ---
function removeFromCart(index) {
    const email = getLoggedUser();
    const allCarts = JSON.parse(localStorage.getItem("carts") || "{}");
    if (!allCarts[email]) return;
    allCarts[email].splice(index, 1);
    localStorage.setItem("carts", JSON.stringify(allCarts));
    loadCart();
}
