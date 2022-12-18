export class ProductService {
    public products: string[];
    constructor(products = []) {
        this.products = products;
    }

    searchByT(search = '') {
        if (!search.trim()) return this.products;

        return this.products.filter((product) => {
            const searchByTitle = product.title.toLowerCase().includes(search.toLowerCase());
            return searchByTitle;
        });
    }

    searchByD(search = '') {
        if (!search.trim()) return this.products;

        return this.products.filter((product) => {
            const searchByDescr = product.description.toLowerCase().includes(search.toLowerCase());
            return searchByDescr;
        });
    }

    get(index) {
        return this.products[index];
    }

    getById(id) {
        return this.products.find((product) => {
            return product.id === id;
        });
    }
}
