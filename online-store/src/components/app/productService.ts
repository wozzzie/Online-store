import { IData } from '../types';

export class ProductService {
    public products: IData[];
    constructor(products = []) {
        this.products = products;
    }

    searchBy(search = '') {
        if (!search.trim()) return this.products;

        return this.products.filter((product) => {
            return (
                product.title.toLowerCase().includes(search.toLowerCase()) ||
                product.description.toLowerCase().includes(search.toLowerCase()) ||
                product.brand.toLowerCase().includes(search.toLowerCase()) ||
                product.category.toLowerCase().includes(search.toLowerCase()) ||
                product.title.toLowerCase().includes(search.toLowerCase()) ||
                product.price.toString().includes(search) ||
                product.rating.toString().includes(search) ||
                product.discountPercentage.toString().includes(search) ||
                product.stock.toString().includes(search)
            );
        });
    }

    get(index: number) {
        return this.products[index];
    }

    getById(id: number) {
        return this.products.find((product) => {
            return product.id === id;
        });
    }
}
