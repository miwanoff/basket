let itemBox = document.querySelectorAll(".item_box");
let cartCont = document.getElementById("cart_content");

function setCartData(o) {
  localStorage.setItem("cart", JSON.stringify(o));
}

// let test = {
//   title: "Test",
//   subject: "JavaScript",
// };
// setCartData(test);

function getCartData() {
  return JSON.parse(localStorage.getItem("cart"));
}
//   cartCont.innerHTML = getCartData().title ;

// Добавляем товар в корзину
function addToCart(e) {
  let button = e.target;
  button.disabled = true; // блокируем кнопку на время операции с корзиной
  let cartData = getCartData() || {}; // получаем данные корзины или создаём новый объект, если данных еще нет
  let parentBox = button.parentNode; // родительский элемент кнопки "Добавить в корзину";
  let itemId = button.getAttribute("data-id"); // ID товара
  let itemTitle = parentBox.querySelector(".item_title").innerHTML; // название товара
  let itemPrice = parentBox.querySelector(".item_price").innerHTML; // стоимость товара
  console.log(cartData);
  if (cartData.hasOwnProperty(itemId)) {
    // если такой товар уже в корзине, то добавляем +1 к его количеству
    cartData[itemId][2] += 1;
  } else {
    // если товара в корзине еще нет, то добавляем в объект
    cartData[itemId] = [itemTitle, itemPrice, 1];
  }
  // Обновляем данные в LocalStorage
  setCartData(cartData);
  button.disabled = false; // разблокируем кнопку после обновления
  cartCont.innerHTML = "Товар додано в кошик.";
  setTimeout(function () {
    cartCont.innerHTML = "Продовжити покупки...";
  }, 1000);
}

function removeItem(minus) {
  
}

// Генериурем корзину со списком добавленных товаров
function openCart(e) {
  let cartData = getCartData(); // вытаскиваем все данные корзины
  console.log(JSON.stringify(cartData));
  // если что-то в корзине уже есть, формируем таблицу
  if (cartData !== null) {
    let cardTable = "";
    cardTable =
      '<table class="shopping_list"><tr><th>Наименование</th><th>Цена</th><th>Кол-во</th><th>Додати</th><th>Видалити</th></tr>';
    for (let items in cartData) {
      cardTable += "<tr>";
      for (let i = 0; i < cartData[items].length; i++) {
        cardTable += "<td>" + cartData[items][i] + "</td>";
      }
      cardTable += "<td> + </td>"
      cardTable += `<td><span class="minus">-</span></td>`
      cardTable += "</tr>";
    }
    cardTable += "<table>";
    cartCont.innerHTML = cardTable;
  } else {
    // если в корзине пусто, то сигнализируем об этом
    cartCont.innerHTML = "У кошику пусто!";
  }
}

// Функция очистки корзины
function clearCart(e) {
  localStorage.removeItem("cart");
  cartCont.innerHTML = "Кошик очишено.";
}

// Обработчик события на каждую кнопку "Добавить в корзину"
for (let i = 0; i < itemBox.length; i++) {
  itemBox[i].querySelector(".add_item").addEventListener("click", addToCart);
}

// Обработчик события на кнопку Открыть корзину
document.getElementById("checkout").addEventListener("click", openCart);

// Обработчик события на кнопку Очистить корзину
document.getElementById("clear_cart").addEventListener("click", clearCart);
