import { HTMLService } from './htmlService';
import { CartService } from './cartService';
import { ProductService } from './productService';

let productService: string;
const cartService = new CartService();
const htmlService = new HTMLService();

const productsContainer = document.getElementById('products');
const cartContainer = document.getElementById('cart');
const filterInput = document.getElementById('filter');

filterInput.addEventListener('input', (event) => {
    const value = event.target.value;
    const filteredProducts = productService.searchByString(value);

    console.log(filteredProducts);
    renderProducts(filteredProducts);
});

productsContainer.addEventListener('click', (event) => {
    const id = event.target.dataset.id ? event.target.dataset.id : event.target.closest('li')?.dataset.id;

    if (id) {
        cartService.add(productService.getById(+id));
        renderCart();
    }
});

cartContainer.addEventListener('click', (event) => {
    const type = event.target?.dataset.type;
    const id = event.target?.dataset.id;

    switch (type) {
        case 'clear':
            cartService.clear();
            renderCart();
            break;
        case 'remove':
            cartService.remove(id);
            renderCart();
            break;
    }
});

function renderProducts(products) {
    productsContainer.innerHTML = htmlService.paintProducts(products);
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
// }

// export default App;
