// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { IData } from '../types';

const Sorts = ['price-ascent', 'price-descent', 'rating-ascent', 'rating-descent'];

export class Sort {
    public priceAscent: HTMLAnchorElement;
    public priceDescent: HTMLAnchorElement;
    public ratingAscent: HTMLAnchorElement;
    public ratingDescent: HTMLAnchorElement;

    constructor() {
        this.priceAscent = document.getElementById('price-ascent');
        this.priceDescent = document.getElementById('price-descent');
        this.ratingAscent = document.getElementById('rating-ascent');
        this.ratingDescent = document.getElementById('rating-descent');
    }

    public sort(event: Event, data: IData[]) {
        const id = event.target.dataset.id;

        if (Sorts.some((item): boolean => item === id)) {
            return this.sortBy(id, data);
        }
    }

    // implementation of sorting
    sortBy(id: string, data: IData[]): IData[] {
        let tempData: IData[] = data;
        switch (id) {
            case 'price-ascent':
                tempData = data.sort((a: IData, b: IData): 1 | -1 | 0 => {
                    if (a.price > b.price) {
                        return 1;
                    }
                    if (a.price < b.price) {
                        return -1;
                    }
                    return 0;
                });
                break;

            case 'price-descent':
                tempData = data.sort((a: IData, b: IData): 1 | -1 | 0 => {
                    if (a.price > b.price) {
                        return -1;
                    }
                    if (a.price < b.price) {
                        return 1;
                    }
                    return 0;
                });
                break;

            case 'rating-ascent':
                tempData = data.sort((a: IData, b: IData): 1 | -1 | 0 => {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (a.rating < b.rating) {
                        return -1;
                    }
                    return 0;
                });
                break;

            case 'rating-descent':
                tempData = data.sort((a: IData, b: IData): 1 | -1 | 0 => {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (a.rating < b.rating) {
                        return 1;
                    }
                    return 0;
                });
                break;
            default:
                break;
        }
        return tempData;
    }
}

export default Sort;
