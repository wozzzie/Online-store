// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { IData } from '../types';

export function createCard(product: IData) {
    return `
    <div data-id="${product.id}">
        <div class="left-column">
            <img src="${product.images[0]}" title="${product.title}" />
            <img src="${product.images[1]}" title="${product.title}" />
            <img src="${product.images[2]}" title="${product.title}" />
        </div>
        <pre>
        <div class="right-column">
        <div class="${product.description}">Headphones
            <h1>Beats EP</h1>
        </div>
        <div class="product-configuration">
        <div class="cable-config">Cable configuration
        <div class="cable-choose">
            <button>Straight</button>
            <button>Coiled</button>
            <button>Long-coiled</button>
        </div>
        <a href="#">How to configurate your headphones</a>
        </div>
        </div>
        <div class="product-price">$${product.price} <a class="cart-btn" href="#">Add to cart</a></div>
        </div>
        <pre>
    </div>
    `;
}
