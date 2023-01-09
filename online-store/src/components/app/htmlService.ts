// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { IData } from '../types';

function ellipsis(string = '', maxLenght = 30) {
    if (string.length > maxLenght) {
        return string.substring(0, maxLenght) + '...';
    }
    return string;
}

export class HTMLService {
    paintProduct(product: IData) {
        return `
        <li data-id="${product.id}">
          <div class="product-img">
            <a>
              <img src="${product.images[0]}" title="${product.title}">
            </a>
          </div>
          <div class="product-list">
            <h3>${ellipsis(product.title, 20)}</h3>
            <div class="stars">${product.rating}</div>
            <span class="price">$${product.price}</span>
            <span class="discount">SALE %${product.discountPercentage}</span>
            <div class="actions">
              <div class="show">
                <a href="/#/${product.id}/${product.title}" data-type="card" data-id="${
            product.id
        }" class="show-button">Show more</a>
              </div>
              <div class="add-to-cart" data-type="add" data-id="${product.id}">
                <a class="cart-button" title="Add to cart" data-type="add" data-id="${product.id}">
                  <svg width="14" height="14" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.4375C0 1.22201 0.0856024 1.01535 0.237976 0.862976C0.390349 0.710602 0.597012 0.625 0.8125 0.625H3.25C3.43124 0.62505 3.60726 0.685695 3.75006 0.79729C3.89287 0.908886 3.99427 1.06502 4.03813 1.24087L4.69625 3.875H23.5625C23.6827 3.87507 23.8013 3.9018 23.9099 3.95325C24.0185 4.0047 24.1143 4.07959 24.1905 4.17254C24.2666 4.26548 24.3212 4.37416 24.3503 4.49075C24.3794 4.60733 24.3823 4.72892 24.3587 4.84675L22.7337 12.9717C22.6982 13.1489 22.6046 13.3092 22.4677 13.4272C22.3309 13.5452 22.1586 13.6143 21.9781 13.6234L6.708 14.3904L7.17438 16.875H21.125C21.3405 16.875 21.5472 16.9606 21.6995 17.113C21.8519 17.2653 21.9375 17.472 21.9375 17.6875C21.9375 17.903 21.8519 18.1097 21.6995 18.262C21.5472 18.4144 21.3405 18.5 21.125 18.5H6.5C6.31058 18.4998 6.12717 18.4335 5.98148 18.3124C5.83579 18.1913 5.73698 18.0232 5.70213 17.837L3.26625 4.86138L2.61625 2.25H0.8125C0.597012 2.25 0.390349 2.1644 0.237976 2.01202C0.0856024 1.85965 0 1.65299 0 1.4375ZM5.04075 5.5L6.40575 12.7784L21.2648 12.0325L22.5713 5.5H5.04075ZM8.125 18.5C7.26305 18.5 6.4364 18.8424 5.8269 19.4519C5.21741 20.0614 4.875 20.888 4.875 21.75C4.875 22.612 5.21741 23.4386 5.8269 24.0481C6.4364 24.6576 7.26305 25 8.125 25C8.98695 25 9.8136 24.6576 10.4231 24.0481C11.0326 23.4386 11.375 22.612 11.375 21.75C11.375 20.888 11.0326 20.0614 10.4231 19.4519C9.8136 18.8424 8.98695 18.5 8.125 18.5ZM19.5 18.5C18.638 18.5 17.8114 18.8424 17.2019 19.4519C16.5924 20.0614 16.25 20.888 16.25 21.75C16.25 22.612 16.5924 23.4386 17.2019 24.0481C17.8114 24.6576 18.638 25 19.5 25C20.362 25 21.1886 24.6576 21.7981 24.0481C22.4076 23.4386 22.75 22.612 22.75 21.75C22.75 20.888 22.4076 20.0614 21.7981 19.4519C21.1886 18.8424 20.362 18.5 19.5 18.5ZM8.125 20.125C7.69402 20.125 7.2807 20.2962 6.97595 20.601C6.67121 20.9057 6.5 21.319 6.5 21.75C6.5 22.181 6.67121 22.5943 6.97595 22.899C7.2807 23.2038 7.69402 23.375 8.125 23.375C8.55598 23.375 8.9693 23.2038 9.27405 22.899C9.57879 22.5943 9.75 22.181 9.75 21.75C9.75 21.319 9.57879 20.9057 9.27405 20.601C8.9693 20.2962 8.55598 20.125 8.125 20.125ZM19.5 20.125C19.069 20.125 18.6557 20.2962 18.351 20.601C18.0462 20.9057 17.875 21.319 17.875 21.75C17.875 22.181 18.0462 22.5943 18.351 22.899C18.6557 23.2038 19.069 23.375 19.5 23.375C19.931 23.375 20.3443 23.2038 20.649 22.899C20.9538 22.5943 21.125 22.181 21.125 21.75C21.125 21.319 20.9538 20.9057 20.649 20.601C20.3443 20.2962 19.931 20.125 19.5 20.125Z" fill="#272727"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </li>
        `;
    }

    paintProducts(products = []) {
        return products.map(this.paintProduct).join('');
    }

    paintCartItem(item: IData) {
        return `
          <li data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" width="100" height="100">
            <h3 class="cart-tittle">${item.title}</h3>
            <p class="cart-price">$${item.price}  x  </p>
            <div class="amount">
              <button class="remove-button" data-type="remove" data-id="${item.id}"> - </button>
              <p class="amount-counter">${item.amount}</p>
              <button class="add-button" data-type="add" data-id="${item.id}"> + </button>
            </div>
          </li>
        `;
    }

    paintCart({ items, totalPrice }) {
        if (items.length === 0) {
            return `<p>Your cart is empty</p>`;
        }

        return `
          <ol class="cart-list">
            ${items.map(this.paintCartItem).join('')}
          </ol>
          <hr />
          <p class="info">
            <span>Total price: <strong>$${totalPrice.toFixed(2)}</strong></span>
            <button class="clear" data-type="clear">Clear all</button>
          </p>
          <div>You have 2 promo:
            <p><strong>RSS</strong></p>
            <p><strong>NEWYEAR</strong></p>
          </div>
          <input id="promo" type="text" class="filter" placeholder="Enter promo">
          <div>
            <span>Final price: <strong>$${totalPrice.toFixed(2)}</strong></span>
            <button class="clear" data-type="buy"><a class="cart-btn" href="/#/cart/modal>BUY</a></button>
          </div>
        `;
    }

    paintError(e: Error) {
        return `<p class="error">${e.message}</p>`;
    }

    paintCardItem(product: IData) {
        return `
        <div data-id="${product.id}">
        <div class="product-page">STORE > ${product.category.toLocaleUpperCase()} > ${product.brand.toLocaleUpperCase()} > ${product.title.toLocaleUpperCase()}</div>
        <pre></pre>
        <div class="product-page__content">
        <div class="left-column">
          <div class="left-column__container">
            <div class="slide" style="background-image: url('${product.images[1]}');"></div>
            <div class="slide active" style="background-image: url('${product.images[2]}');"></div>
            <div class="slide" style="background-image: url('${product.images[3]}');"></div>
          </div>
        </div>
        <pre> 
            <div class="right-column">
            <div class="product-description">
                <h3>${product.title}</h3>
            </div>
            <div class="product-configuration">
                  <p>${product.description}</p>
                  <div class="amount">
                    <button id="card-btn__add"
                      class="add-button"
                      data-type="add"
                      data-id="${product.id}">
                      Add to cart
                    </button>
                  </div>
            </div>
            <div class="product-price">$${product.price}</div>
              <a class="cart-btn" href="/#/cart/modal>BUY on CLICK</a>
            </div>
          </pre>
          </div>
        </div>
        `;
    }
}
