import { http, HttpResponse } from "msw";

import { UpdateProfileBody } from '../update-profile'

export const updateProfileMock = http.post<never, UpdateProfileBody>(
    '/profile',
    async ({ request }) => {
        const { name } = await request.json()

        if (name === 'ia assistant') {
            return new HttpResponse(null, { status: 204 })
        }

        return new HttpResponse('Error', { status: 400 })
    })