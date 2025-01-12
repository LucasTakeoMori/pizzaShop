import { http, HttpResponse } from "msw";

import { GetProfileManager } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http.get<never, never, GetProfileManager>('/managed-restaurant', () => {
    return HttpResponse.json({
        id: 'manager-user-id',
        managerId: 'manager-id',
        name: 'John Doe',
        description: 'manager description',
        createdAt: new Date(),
        updatedAt: null,
    })
})