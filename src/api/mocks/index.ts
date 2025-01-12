import { env } from '@/env'
import { setupWorker } from 'msw/browser'
import { getDailyRevenueInPeriodMock } from './get-daily-revenue-in-period-mock'
import { getDayOrdersAmountMock } from './get-days-orders-amount-mock'
import { getManagedRestaurantMock } from './get-managed-restaurant-mock'
import { getMonthCanceledOrdersAmountMock } from './get-month-canceled-orders-amount-mock'
import { getMonthOrdersAmountMock } from './get-month-orders-amount-mock'
import { getMonthRevenueMock } from './get-month-revenue-mock'
import { getPopularProductsMock } from './get-popular-products-mock'
import { getProfileMock } from './get-profile-mock'
import { registerRestaurantMock } from './register-restaurant-mock'
import { updateProfileMock } from './update-profile-mock'
import { signInMock } from './sign-in-mock'
import { getOrdersDetailMock } from './get-orders-details-mock'
import { getOrdersMock } from './get-orders-mock'
import { approveOrderMock } from './approve-order-mock'
import { canceledOrderMock } from './canceled-order-mock'
import { deliverOrderMock } from './deliver-order-mock'
import { dispatchOrderMock } from './dispatch-order-mock'

export const worker = setupWorker(
    getDailyRevenueInPeriodMock,
    getDayOrdersAmountMock,
    getManagedRestaurantMock,
    getMonthCanceledOrdersAmountMock,
    getMonthOrdersAmountMock,
    getMonthRevenueMock,
    getPopularProductsMock,
    getProfileMock,
    registerRestaurantMock,
    signInMock,
    updateProfileMock,
    getOrdersMock,
    getOrdersDetailMock,
    approveOrderMock,
    canceledOrderMock,
    deliverOrderMock,
    dispatchOrderMock
)

export async function enableMSW() {
    if (env.MODE !== 'test') {
        return
    }

    await worker.start()
}