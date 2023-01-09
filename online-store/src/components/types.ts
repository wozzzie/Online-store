// export type Callback<T> = (data: T) => void;

// export enum Status {
//     'unauthorized' = 401,
//     'notFound' = 404
// }

export interface IData {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    amount: number;
}

export type Items = {
    cart?: {
        id: number;
        title: string;
        amount: number;
        price: number;
    };
};
