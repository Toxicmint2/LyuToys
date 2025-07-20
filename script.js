
function registerUser() {
  const email = document.getElementById('regEmail').value;
  const pass = document.getElementById('regPass').value;
  localStorage.setItem('user', JSON.stringify({ email, pass }));
  alert('Регистрация успешна!');
  location.href = 'login.html';
}

function loginUser() {
  const email = document.getElementById('loginEmail').value;
  const pass = document.getElementById('loginPass').value;
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.email === email && user.pass === pass) {
    localStorage.setItem('loggedIn', 'true');
    alert('Успешен вход!');
    location.href = 'shop.html';
  } else {
    alert('Невалидни данни!');
  }
}

function logoutUser() {
  localStorage.removeItem('loggedIn');
  location.href = 'index.html';
}

function addToCart(name, price) {
  if (!localStorage.getItem('loggedIn')) {
    alert('Моля, влезте в акаунта си!');
    location.href = 'login.html';
    return;
  }
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Добавено в количката!');
}

function loadCart() {
  const items = JSON.parse(localStorage.getItem('cart') || '[]');
  const ul = document.getElementById('cart-items');
  const total = document.getElementById('total');
  ul.innerHTML = '';
  let sum = 0;
  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - ${item.price} лв. <button onclick="removeFromCart(${index})">Премахни</button>`;
    ul.appendChild(li);
    sum += item.price;
  });
  total.textContent = sum.toFixed(2);

  if (items.length > 0) {
    document.getElementById('orderFormContainer').innerHTML = `
      <h3>Данни за доставка</h3>
      <form onsubmit="sendOrder(); return false;">
        Име: <input type="text" id="name" required><br>
        Адрес: <input type="text" id="address" required><br>
        Офис на Еконт: <input type="text" id="office" required><br><br>
        <input type="submit" value="Готово">
      </form>
    `;
  }
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function sendOrder() {
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const office = document.getElementById('office').value;
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const body = encodeURIComponent(
    'Име: ' + name + '\nАдрес: ' + address + '\nОфис: ' + office + '\nПродукти: ' +
    cart.map(i => i.name + ' - ' + i.price + ' лв.').join('\n')
  );
  location.href = 'mailto:lyubomirat@gmail.com?subject=Нова поръчка&body=' + body;
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cart-items')) loadCart();
});
