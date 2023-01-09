// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { HTMLService } from './htmlService';
import { CartService } from './cartService';
import { ProductService } from './productService';
import { FilterService } from './filterService';
import { initSliders } from '../slider/slider';

let productService;
let displayedProducts;

const cartService = new CartService();
const htmlService = new HTMLService();
const filterService = new FilterService();

const productsContainer = document.getElementById('products');
const filterInput = document.getElementById('filter');
const cartContainer = document.getElementById('cart');
const circle = document.getElementById('circle');
const cartPrice = document.getElementById('cart-price');
const filterContainer = document.getElementById('filter_container');

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
    productsContainer.innerHTML = htmlService.paintProducts(products);
}

function renderErrorSearch() {
    productsContainer.innerHTML = 'No items found. Try another filter option.';
}

function renderCart() {
    cartContainer.innerHTML = htmlService.paintCart(cartService.getInfo());
}

function renderFilter(products) {
    filterContainer.innerHTML = filterService.paintFilter(products);
    initSliders(products);
}

function searchProductsByName() {
    filterInput.addEventListener('input', (event) => {
        const value = event.target.value;

        renderProducts(
            displayedProducts.filter(
                (product) =>
                    product.title.toLowerCase().includes(value.toLowerCase()) ||
                    product.description.toLowerCase().includes(value.toLowerCase()) ||
                    product.brand.toLowerCase().includes(value.toLowerCase()) ||
                    product.category.toLowerCase().includes(value.toLowerCase()) ||
                    product.title.toLowerCase().includes(value.toLowerCase()) ||
                    product.price.toString().includes(value) ||
                    product.rating.toString().includes(value) ||
                    product.discountPercentage.toString().includes(value) ||
                    product.stock.toString().includes(value)
            )
        );
    });
}

function filterByCategories(products) {
    const categoriesCheckboxes = document.querySelectorAll('[data-type="category"]');
    const brandsCheckboxes = document.querySelectorAll('[data-type="brand"]');
    let choosenCheckboxes = [];

    [...categoriesCheckboxes, ...brandsCheckboxes].forEach((item) => {
        item.addEventListener('click', (event) => {
            const isBrandsChecked = Array.from(brandsCheckboxes).some((el) => el.checked);
            const isCategoriesChecked = Array.from(categoriesCheckboxes).some((el) => el.checked);

            const targetId = event.target.id;
            if (event.target.checked) {
                choosenCheckboxes.push(targetId);
            } else {
                choosenCheckboxes = choosenCheckboxes.filter((checkboxItem) => checkboxItem !== targetId);
            }

            // console.log('isBrandsChecked', isBrandsChecked);
            // console.log('choosenCheckboxes', choosenCheckboxes);
            // console.log('isCategoriesChecked', isCategoriesChecked);

            const filteredProducts = products.filter((el) => {
                if (isBrandsChecked && isCategoriesChecked) {
                    return choosenCheckboxes.includes(el.category) && choosenCheckboxes.includes(el.brand);
                } else if (isBrandsChecked) {
                    return choosenCheckboxes.includes(el.brand);
                } else {
                    return choosenCheckboxes.includes(el.category);
                }
            });
            // console.log('filteredProducts -->', filteredProducts);

            if (!choosenCheckboxes.length) {
                displayedProducts = products;
                return renderProducts(products);
            }

            if (!filteredProducts.length) {
                return renderErrorSearch();
            }

            displayedProducts = filteredProducts.length > 0 ? filteredProducts : products;
            // console.log('displayedProducts --->', displayedProducts);
            renderProducts(displayedProducts);
        });
    });
}

export function filterByRanges(param, products, min, max) {
    const arr = displayedProducts.filter((productItem) => productItem[param] >= +min && productItem[param] <= +max);

    // let arr = [];
    // if (param === 'price') {
    //     arr = displayedProducts.filter((productItem) => productItem[param] >= +min && productItem[param] <= +max);
    // } else if (param === 'stock') {
    //     arr = displayedProducts.filter((productItem) => productItem[param] >= +min && productItem[param] <= +max);
    // }
    // let pushedArr = [];

    // if (displayedProducts.filter((productItem) => productItem['price'] >= +min && productItem['price'] <= +max)) {
    //     pushedArr.push(displayedProducts);
    //     renderProducts(pushedArr);
    // } else if (pushedArr) {
    //     pushedArr.filter((productItem) => productItem['stock'] >= +min && productItem['stock'] <= +max);
    //     renderProducts(pushedArr);
    // } else {
    //     renderProducts(arr);
    // }

    console.log('arr -->', arr);
    console.log('displayedProducts -->', displayedProducts);
    if (arr.length <= 0) return renderErrorSearch();
    renderProducts(arr);
}

export async function start() {
    renderCart();
    try {
        const response = await fetch('https://dummyjson.com/products/');
        const data = await response.json();
        console.log(data);

        productService = new ProductService(data.products);
        displayedProducts = productService.products;

        renderProducts(productService.products);
        renderFilter(productService.products);
        filterByCategories(productService.products);
        searchProductsByName();
        // filterByBrands(productService.products);
    } catch (e) {
        productsContainer.innerHTML = htmlService.paintError(e);
    }
}
