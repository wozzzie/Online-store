// import { filterToRange } from '../app/app';
import './dualRangeInput.css';
import { updateRangeText } from './helpers';

type RangeElement = HTMLInputElement | null | undefined;

export class DualRangeInput {
    fromSlider: RangeElement;
    toSlider: RangeElement;
    fromInput: RangeElement;
    toInput: RangeElement;

    constructor(name: string) {
        name && this.init(name);
    }

    init(id: string) {
        this.fromSlider = <HTMLInputElement>document.querySelector(`#${id}fromSlider`);
        this.toSlider = <HTMLInputElement>document.querySelector(`#${id}toSlider`);

        this.fromInput = <HTMLInputElement>document.querySelector(`#${id}minValue`);
        this.toInput = <HTMLInputElement>document.querySelector(`#${id}maxValue`);

        this.fillSlider(this.fromSlider, this.toSlider, '#C6C6C6', '#25daa5', this.toSlider);
        this.setToggleAccessible(this.toSlider);

        this.initListeners(this.fromSlider, this.toSlider, this.fromInput, this.toInput);
    }

    render(id: string, min: number, max: number, step: number) {
        return `<div id=${id} class="range_container">
            <div class="sliders_control">
            <input id="${id}fromSlider" type="range" min="0" max="100" value="0" data-min=${min} data-max=${max} data-step=${step}>
            <input id="${id}toSlider" type="range" min="0" max="100" value="100" data-min=${min} data-max=${max} data-step=${step}>
            </div>
            <div class="form_control">
                <div class="form_control_container">
                    <div class="form_control_container__time">Min</div>
                    <span id="${id}minValue"></span>
                </div>
                <div class="form_control_container">
                    <div class="form_control_container__time">Max</div>
                    <span id="${id}maxValue"></span>
                </div>
            </div>
        </div>`;
    }

    initListeners(
        fromSlider: HTMLInputElement,
        toSlider: HTMLInputElement,
        fromInput: HTMLInputElement,
        toInput: HTMLInputElement
    ) {
        if (fromSlider instanceof HTMLElement)
            fromSlider.oninput = () => this.controlFromSlider(fromSlider, toSlider, fromInput);
        if (toSlider instanceof HTMLElement)
            toSlider.oninput = () => this.controlToSlider(fromSlider, toSlider, toInput);
        // if (fromInput instanceof HTMLElement)
        //     fromInput.oninput = () => this.controlFromInput(fromSlider, fromInput, toInput, toSlider);
        // if (toInput instanceof HTMLElement)
        //     toInput.oninput = () => this.controlToInput(toSlider, fromInput, toInput, toSlider);
    }

    // setFromValue(minValue: string, maxValue: string) {
    //     if (this.fromSlider) {
    //         this.fromSlider.value = value;
    //         // this.fromSlider.max = maxVa
    //     }
    // }

    setValue(minValue: string, maxValue: string) {
        console.log('setValue', minValue, maxValue);
        if (this.fromSlider) {
            this.fromSlider.value = minValue;
        }
        if (this.toSlider) {
            this.toSlider.value = maxValue;
        }

        if (this.fromInput) {
            this.fromInput.textContent = minValue;
        }
        if (this.toInput) this.toInput.textContent = maxValue;
    }

    // setMinValue(value: string, minValue: string, maxValue: string) {
    //     if (this.fromSlider) {
    //         this.fromSlider.value = value;
    //         // this.fromSlider.min = minValue;
    //         // this.fromSlider.value = value;
    //     }
    //     if (this.fromInput) this.fromInput.textContent = value;
    // }

    // setMaxValue(value: string) {
    //     if (this.toSlider) this.toSlider.value = value;
    //     if (this.toInput) this.toInput.textContent = value;
    // }

    controlFromSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, fromInput: HTMLInputElement) {
        const [from, to] = this.getParsed(fromSlider, toSlider);
        this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
        if (from > to) {
            fromSlider.value = String(to);
            fromInput.textContent = String(to);
        } else {
            fromInput.textContent = String(from);
        }

        // const minValue = filterToRange('price');
        // updateRangeText(fromInput, fromSlider, minValue.toString());

        // const step = Number(fromSlider.dataset.step);
        // const value = Number(min) + Number(slider.value) * step;
        // filterBy(String(from <= to ? to : from))
    }

    controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, toInput: HTMLInputElement) {
        const [from, to] = this.getParsed(fromSlider, toSlider);
        this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
        this.setToggleAccessible(toSlider);
        if (from <= to) {
            toSlider.value = String(to);
            toInput.textContent = String(to);
        } else {
            toInput.textContent = String(from);
            toSlider.value = String(from);
        }
        // filterBy(String(from <= to ? to : from))
    }

    getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement) {
        console.log(currentFrom.value, currentTo.value);
        const from = parseInt(currentFrom.value, 10);
        const to = parseInt(currentTo.value, 10);
        return [from, to];
    }

    fillSlider(
        from: HTMLInputElement,
        to: HTMLInputElement,
        sliderColor: string,
        rangeColor: string,
        controlSlider: HTMLInputElement
    ) {
        const rangeDistance = Number(to.max) - Number(to.min);
        const fromPosition = Number(from.value) - Number(to.min);
        const toPosition = Number(to.value) - Number(to.min);
        controlSlider.style.background = `linear-gradient(
          to right,
          ${sliderColor} 0%,
          ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
          ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
          ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
          ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
          ${sliderColor} 100%)`;
    }

    setToggleAccessible(currentTarget: HTMLInputElement) {
        currentTarget.style.zIndex = Number(currentTarget.value) <= 0 ? String(2) : String(0);
    }
}
