// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './slider.css';

import { filterByRanges } from '../app/app';

export function getRangeByParam(products: any, param: string) {
    const productsByParam = products.map((productItem: any) => productItem[param]);

    const maxValue = Math.max(...productsByParam);
    const minValue = Math.min(...productsByParam);

    return { maxValue, minValue };
}

export function renderSlider(id: string) {
    return `<div id="${id}_slider"></div>
            <div class="price_value" id="${id}_slider-value"></div>`;
}

export function initSliders(products: any) {
    ['price', 'stock'].forEach((item) => createSlider(products, item));
}

function createSlider(products: any, id: string) {
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
