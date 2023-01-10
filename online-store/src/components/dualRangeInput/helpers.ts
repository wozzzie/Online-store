import { IData } from '../types';

export function getRangeByParam(products: IData, param: string) {
    const productsByParam = products.map((productItem) => productItem[param]);

    const maxValue = Math.max(...productsByParam);
    const minValue = Math.min(...productsByParam);
    const stepValue = (maxValue - minValue) / 100;

    return { maxValue, minValue, stepValue };
}

export function updateRangeText(element: Element, slider, min: string) {
    const step = Number(slider.dataset.step);
    const value = Number(min) + Number(slider.value) * step;
    console.log(value);
    element.innerHTML = isNaN(value) ? '' : value.toFixed(2);
    return value;
}

// updateRangeText(min, slider[0], obj.min.toString());
