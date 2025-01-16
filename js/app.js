import { getData, createRow, validate } from "./function.js";

const form = document.querySelector("#form");
const btn = document.querySelector("#btn");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const count = document.querySelector("#count");
const tbody = document.querySelector("#tbody");
const overalPrice = document.querySelector("#overalPrice");
const overalCount = document.querySelector("#overalCount");

btn &&
  btn.addEventListener("click", function (event) {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }
    const product = {
      id: Date.now(),
      name: name.value,
      price: price.value,
      count: count.value,
    };

    let products = getData();
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    form.reset();

    let row = createRow(product, products.length - 1);
    tbody.innerHTML += row;

    let oldSumPrice = +overalPrice.innerHTML;
    let oldSumCount = +overalCount.innerHTML;

    overalCount.innerHTML = oldSumCount + +product.count;
    overalPrice.innerHTML = oldSumPrice + +product.price;
  });

document.addEventListener("DOMContentLoaded", function () {
  let products = getData();
  let sum = 0;
  let counter = 0;
  products.length > 0 &&
    products.map((product, index) => {
      let row = createRow(product, index);
      tbody.innerHTML += row;

      sum += Number(product.price);
      counter += +product.count;
    });
  overalPrice.innerHTML = sum;
  overalCount.innerHTML = counter;

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete")) {
      let confirmDelete = confirm("Rostdan ham o'chirmoqchimisiz?");
      if (confirmDelete) {
        let elementId = event.target.getAttribute("data-id");

        let products = getData();
        let updatedProducts = products.filter(
          (product) => product.id != elementId
        );
        localStorage.setItem("products", JSON.stringify(updatedProducts));

        let newSumPrice = 0;
        let newCounter = 0;
        updatedProducts.forEach((product) => {
          newSumPrice += +product.price;
          newCounter += +product.count;
        });

        overalPrice.innerHTML = newSumPrice;
        overalCount.innerHTML = newCounter;

        event.target.closest("tr").remove();
        window.location.reload();
      }
    }
  });
});

// 1. Tasodifiy Emoji Generator

const emojilar = ["😀", "🎉", "🚀", "🐱", "🍎", "🌟", "🏀", "🎸", "🌍", "🧩"];
const generateButton = document.getElementById("generateButton");
const emojiDisplay = document.getElementById("emoji-display");

generateButton.addEventListener("click", function () {
  const randomemoji = Math.floor(Math.random() * emojilar.length);
  emojiDisplay.textContent = emojilar[randomemoji];
});

// 2. Matn tahrirlash oynasi

const textArea = document.getElementById("text-area");
const boldButton = document.getElementById("bold-button");
const italicButton = document.getElementById("italic-button");
const clearButton = document.getElementById("clear-button");

boldButton.addEventListener("click", function () {
  textArea.style.fontWeight =
    textArea.style.fontWeight === "bold" ? "normal" : "bold";
});

italicButton.addEventListener("click", function () {
  textArea.style.fontStyle =
    textArea.style.fontStyle === "italic" ? "normal" : "italic";
});

clearButton.addEventListener("click", function () {
  textArea.value = "";
  textArea.style.fontWeight = "normal";
  textArea.style.fontStyle = "normal";
});

// 3. Progress Bar Yaratish
const startButton = document.getElementById("start-button");
const progressBar = document.getElementById("progress-bar");
const message = document.getElementById("message");

let progress = 0;
let interval;

startButton.addEventListener("click", function () {
  if (interval) return;
  progress = 0;
  progressBar.style.width = "0%";
  message.textContent = "";

  interval = setInterval(function () {
    progress += 5;
    progressBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      message.textContent = "Tugadi!";
      startButton.disabled = true;
    }
  }, 100);
});
