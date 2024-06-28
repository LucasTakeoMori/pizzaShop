import { api } from "@/lib/axios";

export type GetPopularProducts = {
    product: string;
    amount: number;
}[]

export async function getPopularProducts() {
    const response = await api.get<GetPopularProducts>('./metrics/popular-products');

    return response.data;
}