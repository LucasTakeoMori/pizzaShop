import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Nav } from './nav-link'

describe('NavLink', () => {
    it('should highlight the NavLink when is the current page link', () => {
        const wrapper = render(
            <>
                <Nav to="/home"> Home </Nav>
                <Nav to="/about"> About </Nav>
            </>, {
                wrapper: ({ children }) => {
                    return (
                        <MemoryRouter initialEntries={['/about']}>
                            {children}     
                        </MemoryRouter>
                    )
                }
            }
        )

        expect(wrapper.getByText('Home').dataset.current).toEqual("false")
        expect(wrapper.getByText('About').dataset.current).toEqual("true")

        wrapper.debug()
    })
})

