import { http, HttpResponse } from "msw";

import { GetOrderDetailsParams, GetOrderDetailsReponse } from '../get-order-details'

export const getOrdersDetailMock = http.get<GetOrderDetailsParams, never, GetOrderDetailsReponse>('/orders/:orderId', ({ params }) => {
    return HttpResponse.json({
        id: params.orderId,
        customer: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: '123131345'
        },
        status: 'pending',
        createdAt: new Date().toISOString(),
        orderItems: [
            {
                id: 'order-item-1',
                priceInCents: 1000,
                product: { name: 'Pizza 4 queijo ' },
                quantity: 2
            },
            {
                id: 'order-item-2',
                priceInCents: 2000,
                product: { name: ' Pizza Doce ' },
                quantity: 1
            },
            {
                id: 'order-item-3',
                priceInCents: 3000,
                product: { name: 'Pizza Doce ' },
                quantity: 1
            },
            {
                id: 'order-item-4',
                priceInCents: 2000,
                product: { name: ' Coca-cola Zero ' },
                quantity: 2
            }
        ],
        totalInCents: 8000
    })
})