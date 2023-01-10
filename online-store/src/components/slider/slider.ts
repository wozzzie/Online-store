import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './slider.css';

import { filterByRanges } from '../app/app';
import { IData } from '../types';

export function getRangeByParam(products: IData, param: string) {
    const productsByParam = products.map((productItem) => productItem[param]);

    const maxValue = Math.max(...productsByParam);
    const minValue = Math.min(...productsByParam);

    return { maxValue, minValue };
}

export function renderSlider(id: string) {
    return `<div id="${id}_slider"></div>
            <div class="price_value" id="${id}_slider-value"></div>`;
}

export function initSliders(products: IData) {
    ['price', 'stock'].forEach((item) => createSlider(products, item));
}

function createSlider(products: IData, id: string) {
    const { minValue, maxValue } = getRangeByParam(products, id);

    const nonLinearStepSlider = document.getElementById(`${id}_slider`);

    if (nonLinearStepSlider) {
        noUiSlider.create(nonLinearStepSlider, {
            start: [minValue, maxValue],
            connect: true,
            range: {
                min: minValue,
                max: maxValue,
            },
        });

        const nonLinearStepSliderValueElement = document.getElementById(`${id}_slider-value`);

        if (nonLinearStepSliderValueElement) {
            nonLinearStepSlider.noUiSlider.on('update', (values) => {
                filterByRanges(id, products, ...values);
                nonLinearStepSliderValueElement.innerHTML = values.join(' - ');
            });
        }
    }
}
