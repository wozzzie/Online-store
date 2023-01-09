import { IData, Items } from '../types';

export class CartService {
    public cart: Items;
    constructor() {
        this.cart = {};
    }

    add(product: IData) {
        const key = product.id;

        if (this.cart[key]) {
            for (let i = 0; i < product.stock; i++) {
                this.cart[key].amount++;
                return;
            }
        }

        this.cart[key] = {
            image: product.images[0],
            title: product.title,
            price: product.price,
            amount: 1,
        };
    }

    remove(productId: number) {
        const amount = this.cart[productId].amount;

        if (amount === 1) {
            delete this.cart[productId];
        } else {
            this.cart[productId].amount--;
        }
    }

    clear() {
        this.cart = {};
    }

    getInfo() {
        const items: Items[] = Object.keys(this.cart).map((id) => {
            return { id, ...this.cart[id] };
        });

        const totalPrice = items.reduce((sum, item) => {
            return (sum += item.amount * item.price);
        }, 0);

        // const promoPrice = totalPrice * 0.9;
        // const twoPromoPrice = totalPrice * 0.8;

        return { items, totalPrice };
    }

    checkPromo({ totalPrice }) {
        let promo = 'RSS';
        let reg = new RegExp('^' + promo + '$');
        if (reg.test(document.form.text.value)) {
            let totalPrice = totalPrice * 0.9;
            return totalPrice;
        }
        promo = 'NEWYEAR';
        reg = new RegExp('^' + promo + '$');
        if (reg.test(document.form.text.value)) {
            let totalPrice = totalPrice * 0.8;
        } else {
            alert('Promo is not valid!');
        }
        return totalPrice;
    }
}
