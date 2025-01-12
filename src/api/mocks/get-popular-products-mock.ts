import { http, HttpResponse } from "msw";

import { GetPopularProducts } from '../get-popular-products'

export const getPopularProductsMock = http.get<never, never, GetPopularProducts>('/metrics/popular-products', () => {
    return HttpResponse.json([
        {
            product: 'Pizza',
            amount: 20
        },
        {
            product: 'Burger',
            amount: 10
        },
        {
            product: 'Sushi',
            amount: 5
        },
        {
            product: 'Pasta',
            amount: 3
        },
    ])
})