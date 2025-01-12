import { http, HttpResponse } from 'msw'
import { RegisterRestaurantBody } from '../register-restaurant'


export const registerRestaurantMock = http.post<never, RegisterRestaurantBody>('/restaurants', async ({ request }) => {
    const { restaurantName } = await request.json()

    if (restaurantName === 'Pizza Shop') {
        return new HttpResponse('Success', { status: 201, })
    }

    return new HttpResponse('Error', { status: 400 })
})