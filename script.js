// CALCULATE & RENDER PRICES

// 1. INITIALIZE PRICES
let subtotalPrice = 0;
let shippingPrice = 0;
let totalPrice = 0;
let itemsCount = 0;

// 2. CALCULATE PRICES FUNCTION
function calculatePrices(subtotal, shipping, total, itemsCount) {
	subtotalPrice = subtotal;
	shippingPrice = shipping;
	totalPrice = total;
	itemsCount = itemsCount;
}

// SELECT THE FOOTER SECTION
const footerEl = document.querySelector("footer");
const itemsCountEl = document
	.querySelector(".items-count")
	.querySelector("span");

// 3. RENDER PRICES FUNCTION
function renderPrices(subtotal, shipping, total, itemsCount) {
	calculatePrices(subtotal, shipping, total, itemsCount);
	footerEl.innerHTML = `
        <h3 class="subtitle">SubTotal: <span class="subtotal-price">${subtotal.toFixed(
					2
				)}</span> $</h3>
        <h3 class="subtitle">Shipping: <span class="shipping-price">${shipping.toFixed(
					2
				)}</span> $</h3>
        <h2 class="title">Total: <span class="total-price">${total.toFixed(
					2
				)}</span> $</h2>
    `;
	itemsCountEl.innerText = itemsCount;
}

renderPrices(0, 0, 0, 0); // Initialize with zero values

// RENDERING PRODUCTS

// 1. SELECT THE PRODUCTS WRAPPER
const productsWrapper = document.querySelector(".products-wrapper");

// 2. RENDER PRODUCTS FUNCTION
function renderProducts() {
	products.forEach((product) => {
		productsWrapper.innerHTML += `
            <div class="product-row" id=${product.id}>
                <div class="product-column product-img">
                    <img src=${product.img} alt="" />
                </div>
                <div class="product-column product-name">
                    <h2>${product.name}</h2>
                </div>
                <div class="product-column unit-price">
                    <span>${product.price.toFixed(2)} </span> $
                </div>
                <div class="product-column product-price">
                    <span>${product.price.toFixed(2)} </span> $
                </div>
                <div class="product-column product-quantity">
                    <button class="btn plus" onclick="increaseQtyAndPrice(${
											product.id
										})">+</button>
                    <span class="qty-number">1</span>
                    <button class="btn minus" onclick="decreaseQtyAndPrice(${
											product.id
										})">-</button>
                </div>
                <div class="product-column product-action">
                    <button class="btn like">
                        <i class="fa-regular fa-heart"></i> Like
                    </button>
                    <button class="btn remove" onclick="addToCart(${
											product.id
										})">
                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
	});
}

renderProducts();

// Shopping Cart Management
let shoppingCart = new ShoppingCart();

function addToCart(productId) {
	const product = products.find((p) => p.id === productId);
	shoppingCart.addItem(product, 1);
	updateCartDisplay();
}

function updateCartDisplay() {
	const { subtotal, shipping, total } = shoppingCart.getTotal();
	renderPrices(subtotal, shipping, total, shoppingCart.displayItems().length);
}

// REMOVE PRODUCTS FROM CART

function removeProduct(id) {
	shoppingCart.removeItem(id);
	updateCartDisplay();

	const elementToRemove = document.getElementById(id);
	productsWrapper.removeChild(elementToRemove);

	if (productsWrapper.querySelector("[id]") === null) {
		productsWrapper.innerHTML = `<div class="empty-msg"><h1>Empty Cart!</h1> <button class="show-products btn remove" onclick="renderProducts()">Show products again!</button></div>`;
	}
}

// CHANGE LIKE BUTTON ON CLICK
let likeButtons = document.querySelectorAll(".like");
for (let likeButton of likeButtons) {
	likeButton.addEventListener("click", function (event) {
		let target = event.target;
		target.classList.toggle("liked");
		let buttonIcon = target.querySelector(".fa-heart");
		buttonIcon.classList.toggle("fa-solid");
		buttonIcon.classList.toggle("fa-regular");
	});
}

// CHANGE PRODUCT QUANTITY

function increaseQtyAndPrice(id) {
	const currentProduct = document.getElementById(`${id}`);
	const currentStock = products[id].stock;
	const UnitPrice = products[id].price;

	const currentPriceSpan = currentProduct.querySelector(".product-price span");
	let currentPrice = Number(currentPriceSpan.innerText);
	const qtySpan = currentProduct.querySelector(".qty-number");
	let qty = Number(qtySpan.innerText);

	if (qty < currentStock) {
		qty++;
		qtySpan.innerText = qty;
		currentPrice = Number((currentPrice + UnitPrice).toFixed(2));
		currentPriceSpan.innerText = currentPrice;

		subtotalPrice = Number((subtotalPrice + UnitPrice).toFixed(2));
		totalPrice = Number((totalPrice + UnitPrice).toFixed(2));
		itemsCount++;

		renderPrices(subtotalPrice, shippingPrice, totalPrice, itemsCount);
	} else {
		alert("This product is out of stock!");
	}
}

function decreaseQtyAndPrice(id) {
	const currentProduct = document.getElementById(`${id}`);
	const UnitPrice = products[id].price;

	const currentPriceSpan = currentProduct.querySelector(".product-price span");
	let currentPrice = Number(currentPriceSpan.innerText);
	const qtySpan = currentProduct.querySelector(".qty-number");
	let qty = Number(qtySpan.innerText);

	if (qty > 1) {
		qty--;
		qtySpan.innerText = qty;
		currentPrice = Number((currentPrice - UnitPrice).toFixed(2));
		currentPriceSpan.innerText = currentPrice;

		subtotalPrice = Number((subtotalPrice - UnitPrice).toFixed(2));
		totalPrice = Number((totalPrice - UnitPrice).toFixed(2));
		itemsCount--;

		renderPrices(subtotalPrice, shippingPrice, totalPrice, itemsCount);
	} else {
		removeProduct(id);
	}
}
