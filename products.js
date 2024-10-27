class Product {
	constructor(id, name, price, stock, shipping, img) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.stock = stock;
		this.shipping = shipping;
		this.img = img;
	}
}

const products = [
	new Product(
		0,
		"Souris Logitech MX ERGO S",
		119.99,
		5,
		12,
		"./assets/Product_01.webp"
	),
	new Product(
		1,
		"Clavier Logitech K860",
		129.0,
		3,
		8,
		"./assets/Product_02.webp"
	),
	new Product(
		2,
		"Logitech Stylet (USB-C)",
		89.99,
		2,
		10,
		"./assets/Product_03.webp"
	),
];

class ShoppingCartItem {
	constructor(product, quantity) {
		this.product = product;
		this.quantity = quantity;
	}

	getTotalPrice() {
		return this.product.price * this.quantity;
	}
}

class ShoppingCart {
	constructor() {
		this.items = [];
	}

	addItem(product, quantity) {
		const existingItem = this.items.find(
			(item) => item.product.id === product.id
		);
		if (existingItem) {
			existingItem.quantity += quantity;
		} else {
			this.items.push(new ShoppingCartItem(product, quantity));
		}
	}

	removeItem(productId) {
		this.items = this.items.filter((item) => item.product.id !== productId);
	}

	getTotal() {
		const subtotal = this.items.reduce(
			(sum, item) => sum + item.getTotalPrice(),
			0
		);
		const shipping = this.items.reduce(
			(sum, item) => sum + item.product.shipping,
			0
		);
		return {
			subtotal: subtotal,
			shipping: shipping,
			total: subtotal + shipping,
		};
	}

	displayItems() {
		return this.items;
	}
}
