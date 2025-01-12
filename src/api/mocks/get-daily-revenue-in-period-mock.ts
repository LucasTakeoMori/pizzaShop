import { http, HttpResponse } from "msw"
import { GetDailyRevenueInPeriod } from "../get-daily-revenue-in-period"

export const getDailyRevenueInPeriodMock = http.get<never, never, GetDailyRevenueInPeriod>('/metrics/daily-receipt-in-period', () => {
    return HttpResponse.json([
        {
            date: '2023-01-01',
            receipt: 10000,
        },
        {
            date: '2023-01-02',
            receipt: 20000,
        },
        {
            date: '2023-01-03',
            receipt: 30000,
        },
        {
            date: '2023-01-04',
            receipt: 40000,
        },
    ])
})