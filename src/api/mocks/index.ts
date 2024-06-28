import { env } from '@/env'
import { setupWorker } from 'msw/browser'
import { signInMock } from './sign-in-mock'
import { registerRestaurantMock } from './register-restaurant-mock'

export const worker = setupWorker(signInMock, registerRestaurantMock)

export async function enableMSW() {
    if(env.MODE !== 'test') {
        return
    }

    await worker.start()
}