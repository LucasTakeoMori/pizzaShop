import { render } from '@testing-library/react'
import { OrderStatus } from './order-status'

describe('Order Status', () => {
    it('should display the right text when order status is pending', () => {
        let wrapper = render( <OrderStatus status="pending"/> )

        wrapper.debug()

        let statusText = wrapper.getByText('Pendente')
        let badgeElements = wrapper.getAllByTestId('badge')

        expect(statusText).toBeInTheDocument()
        expect(badgeElements.length).toBeGreaterThan(0)
        expect(badgeElements[0]).toHaveAttribute('class', 'h-2 w-2 rounded-full bg-slate-400')
    })

    it('should display the right text when order status is canceled', () => {
        let wrapper = render( <OrderStatus status="canceled"/> )

        wrapper.debug()

        let statusText = wrapper.getByText('Cancelado')
        let badgeElements = wrapper.getAllByTestId('badge')

        expect(statusText).toBeInTheDocument()
        expect(badgeElements.length).toBeGreaterThan(0)
        expect(badgeElements[0]).toHaveAttribute('class', 'h-2 w-2 rounded-full bg-rose-500')
    })

        it('should display the right text when order status is delivering', () => {
        let wrapper = render( <OrderStatus status="delivering"/> )

        wrapper.debug()

        let statusText = wrapper.getByText('Em entrega')
        let badgeElements = wrapper.getAllByTestId('badge')

        expect(statusText).toBeInTheDocument()
        expect(badgeElements.length).toBeGreaterThan(0)
        expect(badgeElements[0]).toHaveAttribute('class', 'h-2 w-2 rounded-full bg-amber-500')
    })

    it('should display the right text when order status is processing', () => {
        let wrapper = render( <OrderStatus status="processing"/> )

        wrapper.debug()

        let statusText = wrapper.getByText('Em preparo')
        let badgeElements = wrapper.getAllByTestId('badge')

        expect(statusText).toBeInTheDocument()
        expect(badgeElements.length).toBeGreaterThan(0)
        expect(badgeElements[0]).toHaveAttribute('class', 'h-2 w-2 rounded-full bg-amber-500')
    })

    it('should display the right text when order status is delivered', () => {
        let wrapper = render( <OrderStatus status="delivered"/> )

        wrapper.debug()

        let statusText = wrapper.getByText('Entregue')
        let badgeElements = wrapper.getAllByTestId('badge')

        expect(statusText).toBeInTheDocument()
        expect(badgeElements.length).toBeGreaterThan(0)
        expect(badgeElements[0]).toHaveAttribute('class', 'h-2 w-2 rounded-full bg-emerald-500')
    })
})