export class ProductService {
    public products: string[];
    constructor(products = []) {
        this.products = products;
    }

    searchByString(search = '') {
        if (!search.trim()) return this.products;

        return (
            this.products.filter((product) => {
                const searchByTitle = product.title.toLowerCase().includes(search.toLowerCase());
                return searchByTitle;
            }) &&
            this.products.filter((product) => {
                const searchByCategory = product.category.toLowerCase().includes(search.toLowerCase());
                return searchByCategory;
            }) &&
            this.products.filter((product) => {
                const searchByDescr = product.description.toLowerCase().includes(search.toLowerCase());
                return searchByDescr;
            }) &&
            this.products.filter((product) => {
                const searchByBrand = product.brand.toLowerCase().includes(search.toLowerCase());
                return searchByBrand;
            })
        );
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
