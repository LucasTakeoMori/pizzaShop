import { http, HttpResponse } from "msw";

import { GetMonthRevenue } from '../get-month-revenue'

export const getMonthRevenueMock = http.get<never, never, GetMonthRevenue>('/metrics/month-receipt', () => {
    return HttpResponse.json({
        receipt: 20000,
        diffFromLastMonth: 10
    })
})