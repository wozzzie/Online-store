// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { renderSlider } from '../slider/slider';
import { IData } from '../types';

export class FilterService {
    MAX: number;
    MIN: number;

    constructor() {
        this.MAX = 100;
        this.MIN = 0;
    }

    paintCategories(category = []) {
        return `
            <div class="filter_block-item">
            <input data-type="category" class="filter_checkbox" type="checkbox" id="${category[0]}">
            <label for="${category[0]}" class="filter_label">${category[0]}</label>
            <span class="filter_quantity">${category[1]} / ${category[1]}</span>
         </div>
            `;
    }
    printBrands(brand = []) {
        return `
        <div class="filter_block-item">
        <input data-type="brand" class="filter_checkbox" type="checkbox" id="${brand[0]}">
        <label for="${brand[0]}" class="filter_label">${brand[0]}</label>
        <span class="filter_quantity">${brand[1]} / ${brand[1]}</span>
     </div>
        `;
    }

    filterFunction(product: IData, flag: string) {
        const arr: [] = [];
        product.forEach((el: { category: string; brand: string }) =>
            flag === 'category' ? arr.push(el.category) : arr.push(el.brand)
        );
        const counts = {};
        arr.forEach(function (x) {
            counts[x] = (counts[x] || 0) + 1;
        });
        const result = Object.entries(counts);
        return result;
    }

    paintFilter(products: IData) {
        const category = this.filterFunction(products, 'category');
        const brand = this.filterFunction(products, 'brand');

        return `<div class="btns_container"></div>
        <button class="filter_btn filter_reset">Reset Filters</button>
        <button class="filter_btn filter_copy">Copy Link</button>


        <div id="slider-non-linear-step"></div>
        <div class="filter_block category">
           <h2 class="block_title"> Categories
           </h2>
           <div class="filter_block-list">
              ${category.map((el) => this.paintCategories(el)).join('')}
           </div>
        </div>
        <div class="filter_block brand">
           <h2 class="block_title"> Brand
           </h2>
           <div class="filter_block-list">
              ${brand.map((el) => this.printBrands(el)).join('')}
           </div>
        </div>
        <div class="filter_block price">
           <h2 class="block_title"> Price
           </h2>
           ${renderSlider('price')}
           <div class="price_range">
           </div>
        </div>
        <div class="filter_block stock">
           <h2 class="block_title">Stock</h2>
           ${renderSlider('stock')}
            <div class="price_range">
            </div>
      </div>
        </div>
        `;
    }
}
