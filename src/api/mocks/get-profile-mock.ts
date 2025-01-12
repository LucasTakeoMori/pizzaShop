import { http, HttpResponse } from "msw";

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>('/me', () => {
    return HttpResponse.json({
        id: 'custom-user-id',
        name: 'John Doe',
        email: 'johndoe@example.com.br',
        phone: '1400000000',
        role: 'manager',
        createdAt: new Date(),
        updatedAt: null
    })
})