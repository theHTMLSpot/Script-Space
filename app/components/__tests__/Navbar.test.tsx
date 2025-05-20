import React from 'react'
import { render, screen } from '@testing-library/react'
import Navbar from '../Navbar'
import { usePathname } from 'next/navigation'

// Mock the usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('Navbar Component', () => {
  beforeEach(() => {
    // Reset the mock before each test
    jest.clearAllMocks()
  })

  it('renders the navbar with logo text', () => {
    // Mock usePathname to return '/'
    ;(usePathname as jest.Mock).mockReturnValue('/')

    render(<Navbar />)

    // Check if the logo text is rendered
    expect(screen.getByText('ScriptedSpaces')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    // Mock usePathname to return '/'
    ;(usePathname as jest.Mock).mockReturnValue('/')

    render(<Navbar />)

    // Check if all links are rendered
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Templates')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('highlights the active link based on current path', () => {
    // Mock usePathname to return '/about'
    ;(usePathname as jest.Mock).mockReturnValue('/about')

    render(<Navbar />)

    // Get all the link elements
    const homeLink = screen.getByText('Home').closest('a')
    const templatesLink = screen.getByText('Templates').closest('a')
    const aboutLink = screen.getByText('About').closest('a')
    const contactLink = screen.getByText('Contact').closest('a')

    // Check that the About link has the active class (includes border-blue-500)
    expect(aboutLink?.className).toContain('border-blue-500')

    // Check that other links don't have the active class
    expect(homeLink?.className).not.toContain('border-blue-500')
    expect(templatesLink?.className).not.toContain('border-blue-500')
    expect(contactLink?.className).not.toContain('border-blue-500')
  })
})
