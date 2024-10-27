Shopping Cart Implementation

# Overview

This project implements a simple shopping cart system using JavaScript. It includes functionalities to manage products, add them to a shopping cart, calculate totals, and display cart contents.

# Features

Product Management: Create products with properties like ID, name, price, stock, and shipping cost.

Shopping Cart Functionality: - Add products to the cart with specified quantities. - Remove items from the cart. - Calculate subtotal, shipping, and total prices. - Display current items in the cart.

# Object Classes

1. Product: Represents an individual product with the following properties:

   - id: Unique identifier for the product.
   - name: Name of the product.
   - price: Price of the product.
   - stock: Available stock quantity.
   - shipping: Shipping cost associated with the product.
   - img: Image URL of the product.

2. ShoppingCartItem: Represents an item in the shopping cart with:

   - product: The product object.
   - quantity: Quantity of the product in the cart.
   - Method to calculate the total price for that item.

3. ShoppingCart: Manages a collection of ShoppingCartItem instances with methods to:
   - Add items to the cart.
   - Remove items from the cart.
   - Calculate total prices (subtotal and total).
   - Display current items in the cart.

# Usage

1. Creating Products: Products can be instantiated using the Product class.
2. Managing the Shopping Cart:
   - Create a shopping cart instance using the ShoppingCart class.
   - Use methods to add and remove items from the cart.
   - Display cart contents and totals using the relevant methods.
