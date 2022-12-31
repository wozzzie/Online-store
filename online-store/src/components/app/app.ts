import { HTMLService } from './htmlService';
import { CartService } from './cartService';
import { ProductService } from './productService';

let productService;
const cartService = new CartService();
const htmlService = new HTMLService();

const productsContainer = document.getElementById('products');
const filterInput = document.getElementById('filter');
const cartContainer = document.getElementById('cart');
const circle = document.getElementById('circle');
const cartPrice = document.getElementById('cart-price');

function getPrice() {
    const price = cartService.getInfo().totalPrice;
    cartPrice ? (cartPrice.innerHTML = price) : false;
}

// counter for the cart circle
let counter = 0;

function countCard() {
    counter++;
    circle ? (circle.innerHTML = counter.toString()) : false;
}

function decountCard() {
    counter--;
    circle ? (circle.innerHTML = counter.toString()) : false;
}

if (filterInput) {
    filterInput.addEventListener('input', (event) => {
        const value = event.target.value;
        const filteredProducts = productService.searchBy(value);

        renderProducts(filteredProducts);
    });
}

if (productsContainer) {
    productsContainer.addEventListener('click', (event) => {
        const id = event.target.dataset.id ? event.target.dataset.id : event.target.closest('li')?.dataset.id;
        if (id) {
            cartService.add(productService.getById(+id));
            countCard();
            getPrice();
            renderCart();
        }
    });
}

if (cartContainer) {
    cartContainer.addEventListener('click', (event) => {
        const type = event.target?.dataset.type;
        const id = event.target?.dataset.id;

        switch (type) {
            case 'clear':
                cartService.clear();
                counter = 0;
                circle ? (circle.innerHTML = counter.toString()) : false;
                getPrice();
                renderCart();
                break;
            case 'remove':
                cartService.remove(id);
                decountCard();
                getPrice();
                renderCart();
                break;
        }
    });
}

function renderProducts(products) {
    productsContainer.innerHTML = htmlService.paintProducts(products)
}

function renderCart() {
    cartContainer.innerHTML = htmlService.paintCart(cartService.getInfo());
}

export async function start() {
    renderCart();
    try {
        const response = await fetch('https://dummyjson.com/products/');
        const data = await response.json();
        console.log(data);

        productService = new ProductService(data.products);
        renderProducts(productService.products);
    } catch (e) {
        productsContainer.innerHTML = htmlService.paintError(e);
    }
}

// export default App;
