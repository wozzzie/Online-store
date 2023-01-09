import Router from './../controller/router';
import { HTMLService } from './htmlService';
import { CartService } from './cartService';
import { ProductService } from './productService';
import { slidesPlugin } from './productCard';
import { IData } from '../types';

const router = new Router({
    mode: 'hash',
    root: '/',
});

router
    .add(/cart/, () => {
        if (container) container.style.display = 'none';
        if (card) card.style.display = 'none';
    })
    .add(/products\/(.*)\/specification\/(.*)/, (id, specification) => {
        if (container) container.style.display = 'none';
        if (cart) cart.style.display = 'none';
        // alert(`products: ${id} specification: ${specification}`);
    })
    .add('', () => {
        // if (card) card.style.display = 'none';
        // if (cart) cart.style.display = 'none';
    });

let productService: ProductService;
const cartService: CartService = new CartService();
const htmlService: HTMLService = new HTMLService();

const main = document.getElementById('main');
const container = document.getElementById('container');
const productsContainer = document.getElementById('products');
const filterInput = document.getElementById('filter');

const card = document.createElement('div');
main?.appendChild(card);
card.id = 'card';

const cart = document.createElement('div');
main?.appendChild(cart);
cart.className = 'cart';
const cartTitle = document.createElement('h2');
cart.appendChild(cartTitle);
cartTitle.innerText = 'Cart';
const cartContainer = document.createElement('div');
cart.appendChild(cartContainer);
cartContainer.id = 'cart';

const circle = document.getElementById('circle');
const cartPrice = document.getElementById('cart-price');

const cardBtnAdd = document.getElementById('card-btn__add');

function getPrice() {
    const price = cartService.getInfo().totalPrice;
    cartPrice ? (cartPrice.innerHTML = `$` + price) : false;
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
        const target = event.target as HTMLInputElement;
        const value = target.value;
        const filteredProducts = productService.searchBy(value);

        renderProducts(filteredProducts);
    });
}

if (productsContainer) {
    productsContainer.addEventListener('click', (event) => {
        const target = event.target as HTMLButtonElement;
        const type = target.dataset.type;
        const id = target.dataset.id;

        switch (type) {
            case 'add':
                if (id) {
                    cartService.add(productService.getById(+id));
                    countCard();
                    getPrice();
                    renderCart();
                }
                break;
            case 'card':
                if (id) {
                    createCard(productService.getById(+id));
                    slidesPlugin(1);
                }
                break;
        }
    });
}

if (card) {
    card.addEventListener('click', (event) => {
        const target = event.target as HTMLButtonElement;
        const type = target.dataset.type;
        const id = target.dataset.id;

        switch (type) {
            case 'add':
                if (id) {
                    cardBtnAdd ? (cardBtnAdd.innerText = 'Added') : 'Error';
                    cartService.add(productService.getById(+id));
                    countCard();
                    getPrice();
                    renderCart();
                }
                break;
            case 'remove':
                if (id) {
                    cartService.remove(+id);
                    decountCard();
                    getPrice();
                    renderCart();
                }
                break;
        }
    });
}

if (cartContainer) {
    cartContainer.addEventListener('click', (event) => {
        const target = event.target as HTMLButtonElement;
        const type = target.dataset.type;
        const id = target.dataset.id;

        switch (type) {
            case 'add':
                if (id) {
                    cartService.add(productService.getById(+id));
                    countCard();
                    getPrice();
                    renderCart();
                }
                break;
            case 'clear':
                cartService.clear();
                counter = 0;
                circle ? (circle.innerHTML = counter.toString()) : false;
                getPrice();
                renderCart();
                break;
            case 'remove':
                if (id) {
                    cartService.remove(+id);
                    decountCard();
                    getPrice();
                    renderCart();
                }
                break;
        }
    });
}

function createCard(id: IData) {
    card ? (card.innerHTML = htmlService.paintCardItem(id)) : 'Error';
}

export function renderProducts(products) {
    productsContainer ? (productsContainer.innerHTML = htmlService.paintProducts(products)) : 'Error';
}

export function renderCart() {
    cartContainer ? (cartContainer.innerHTML = htmlService.paintCart(cartService.getInfo())) : 'Error';
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
        productsContainer ? (productsContainer.innerHTML = htmlService.paintError(e)) : 'Error';
    }
}

// export default App;
