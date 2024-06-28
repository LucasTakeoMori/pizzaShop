import { createBrowserRouter} from 'react-router-dom'
import { Applayout } from './pages/_layouts/app'
import { Authlayout } from './pages/_layouts/auth'

import { Dashboard } from './pages/app/dashboard/dashboard'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { Orders } from './pages/app/orders/orders'
import { NotFound } from './pages/404'
import { Error } from './pages/error'

export const router = createBrowserRouter([
    { 
        path: '/',
        element: <Applayout />,
        errorElement: <Error />,
        children: [
            {path: '/', element: <Dashboard />},
            {path: '/orders', element: <Orders />},
        ],
    },
    { 
        path: '/',
        element: <Authlayout />,
        children: [
            {path: '/sign-in', element: <SignIn />},
            {path: '/sign-Up', element: <SignUp />},
        ],
    },
    {
        path: '*',
        element: <NotFound />
    }
])