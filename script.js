let price = [8.95, 11.95, 14.95, 9.75, 15.99];
let food = [
  "Pizza Salami",
  "Pizza Meeresfrüchte",
  "Pizza Rind",
  "Pizza Vier Jahreszeiten",
  "Mafia Teller",
];

let description = [
  "mit Salami",
  "mit Meeresfrüchten",
  "mit Rinderfiletstreifen",
  "mit Schinken, Salami, Champignons und Paprika",
  "mit 1x Hähnchenspieß, 1x Kalbspieß, 1x Hackspieß, Pommes Frites, Reis",
];

let priceBasket = [];
let foodBasket = [];
let amountBasket = [];
let deliveryFee = 4.95;

function loadMenu() {
  for (let i = 0; i < price.length; i++) {
    let priceNew = price[i].toFixed(2);
    document.getElementById("output").innerHTML += /*html*/ `
        <div class="containerFood">
        <div class="containerFoodHeader">
          <h3>${food[i]}</h3>
          <span class="addLink" onclick="checkOfExists(${i})">+</span>
        </div>
        <span class="descriptionFood">${description[i]}</span>
        <p>${priceNew} €</p>
        </div>
      `;
  }
}

function checkOfExists(i) {
  let nameOfFood = food[i];
  let outputIndexOf = foodBasket.indexOf(nameOfFood);
  if (outputIndexOf == -1) {
    addToBasket(-1, i);
  } else {
    addToBasket(outputIndexOf, i);
  }
}

function addToBasket(index, i) {
  if (index == -1) {
    priceBasket.push(price[i]);
    foodBasket.push(food[i]);
    amountBasket.push(1);
    calculateBasket();
  } else {
    amountBasket[index]++;
    calculateBasket();
  }
}

function loadBasket(sum, totalSum) {
  let basketOutput = document.getElementById("basketOutput");

  if (foodBasket.length > 0) {
    basketOutput.innerHTML = ``;
    basketOutput.innerHTML = renderHTMLBasketTop();
    for (let i = 0; i < foodBasket.length; i++) {
      let totalSubArticle = priceBasket[i] * amountBasket[i];
      totalSubArticle = totalSubArticle.toFixed(2);
      basketOutput.innerHTML += renderHTMLBasketMiddle(i, totalSubArticle);
    }
    basketOutput.innerHTML += renderHTMLBasketEnd(sum, totalSum);
  } else {
    basketOutput.innerHTML = `<p class="basketInfo">Keine Artikel im Warenkorb</p>`;
  }
}

function renderHTMLBasketTop() {
  return /*html*/ `<tr>
            <th colspan="2">Menge</th>
            <th>Artikel</th>
            <th>Preis / €</th>
          </tr>
          `;
}

function renderHTMLBasketMiddle(i, totalSubArticle) {
  return /*html*/ `<tr>
           <td class="tdAmount">${amountBasket[i]} x</td>
           <td class="amountChange">
             <div class="addAmount" onclick="addAmount(${i})">+</div>
             <div class="minusAmount" onclick="minusAmount(${i})">-</div>
           </td>
           <td class="foodBasket">${foodBasket[i]}</td>
           <td class="tdPrice">${totalSubArticle} €</td>
          </tr>`;
}

function renderHTMLBasketEnd(sum, totalSum) {
  return /*html*/ `<tr><td>&nbsp;</td></tr><tr>
           <td colspan="2" class="border-top">Zwischensumme</td>
           <td class="tdPrice" colspan="2">${sum} €</td>
          </tr>            
          <tr>
           <td colspan="2">Lieferpauschale</td>
           <td class="tdPrice" colspan="2">${deliveryFee} €</td>
          </tr>
          <tr>
           <td colspan="2">Gesamtpreis</td>
           <td class="tdPrice" colspan="2">${totalSum} €</td>
          </tr>
          <tr>
           <td colspan="4" class="basketInfo"><button onclick="order();">Bestellen</button></td>
           </tr>`;
}

function calculateBasket() {
  let sum = 0;
  for (i = 0; i < priceBasket.length; i++) {
    sum += priceBasket[i] * amountBasket[i];
  }
  let totalSum = sum + deliveryFee;
  sum = sum.toFixed(2);
  totalSum = totalSum.toFixed(2);
  loadBasket(sum, totalSum);
  loadSmallBasket(sum, totalSum);
}

function addAmount(index) {
  amountBasket[index]++;
  calculateBasket();
}

function minusAmount(index) {
  if (amountBasket[index] > 0) {
    amountBasket[index]--;

    if (amountBasket[index] == 0) {
      priceBasket.splice(index, 1);
      foodBasket.splice(index, 1);
      amountBasket.splice(index, 1);
    }
  }
  calculateBasket();
}

function order() {
  document.getElementById("basketOutput").innerHTML = ``;
  document.getElementById(
    "basketOutput"
  ).innerHTML += ` <p class="basketInfo">Bestellung erfolgreich</p>`;
  priceBasket = [];
  foodBasket = [];
  amountBasket = [];
}

function openDialog() {
  document.getElementById("dialog").classList.remove("d-none");
}

function closeDialog() {
  document.getElementById("dialog").classList.add("d-none");
}

function loadSmallBasket(sum, totalSum) {
  let basketOutput = document.getElementById("dialogMessage");

  if (foodBasket.length > 0) {
    basketOutput.innerHTML = ``;
    basketOutput.innerHTML = renderHTMLSmallBasketTop();
    for (let i = 0; i < foodBasket.length; i++) {
      let totalSubArticle = priceBasket[i] * amountBasket[i];
      totalSubArticle = totalSubArticle.toFixed(2);
      basketOutput.innerHTML += renderHTMLSmallBasketMiddle(i, totalSubArticle);
    }
    basketOutput.innerHTML += renderHTMLSmallBasketEnd(sum, totalSum);
  } else {
    basketOutput.innerHTML = `<p class="basketInfoSmall">Keine Artikel im Warenkorb</p>`;
  }
}

function orderSmall() {
  document.getElementById("dialogMessage").innerHTML = ``;
  document.getElementById(
    "dialogMessage"
  ).innerHTML += ` <p class="basketInfo">Bestellung erfolgreich</p>
 `;
  priceBasket = [];
  foodBasket = [];
  amountBasket = [];
  order();
}

function renderHTMLSmallBasketTop() {
  return /*html*/ `<tr>
           <th colspan="2">Menge</th>
           <th>Artikel</th>
           <th>Preis / €</th>
          </tr>
          `;
}

function renderHTMLSmallBasketMiddle(i, totalSubArticle) {
  return /*html*/ `<tr>
           <td class="tdAmountS">${amountBasket[i]} x</td>
           <td class="amountChangeSmall">
            <div class="addAmount" onclick="addAmount(${i})">+</div>
            <div class="minusAmount" onclick="minusAmount(${i})">-</div>
           </td>
           <td class="foodBasketSmall">${foodBasket[i]}</td>
           <td class="tdPriceSmall">${totalSubArticle} €</td>
          </tr>`;
}

function renderHTMLSmallBasketEnd(sum, totalSum) {
  return /*html*/ `<tr><td>&nbsp;</td></tr><tr>
           <td colspan="2" class="border-top">Zwischensumme</td>
           <td class="tdPriceSmall" colspan="2">${sum} €</td>
          </tr><tr>
           <td colspan="2">Lieferpauschale</td>
           <td class="tdPriceSmall" colspan="2">${deliveryFee} €</td>
          </tr><tr>
           <td colspan="2">Gesamtpreis</td>
           <td class="tdPriceSmall" colspan="2">${totalSum} €</td>
          </tr><tr>
           <td colspan="4" class="basketInfoSmall"><button onclick="orderSmall();">Bestellen</button></td>
          </tr>`;
}
