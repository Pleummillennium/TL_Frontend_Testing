import { describe, it, expect, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

beforeAll(() => {
  // BlurText uses IntersectionObserver which is not available in jsdom
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    root = null
    rootMargin = ''
    thresholds = [0]
    takeRecords() { return [] }
  } as unknown as typeof IntersectionObserver
})

describe('App', () => {
  it('should render state toggle tabs', () => {
    render(<App />)
    expect(screen.getByText('Need Approval')).toBeInTheDocument()
    expect(screen.getByText('Approved')).toBeInTheDocument()
  })

  it('should default to NEED_APPROVAL state', () => {
    render(<App />)
    // ActionButtons should be visible in NEED_APPROVAL state
    expect(screen.getByText('Approve')).toBeInTheDocument()
    expect(screen.getByText('Reject')).toBeInTheDocument()
  })

  it('should switch to APPROVED state when clicking Approved tab', async () => {
    render(<App />)
    await userEvent.click(screen.getByText('Approved'))
    // ActionButtons should not be visible in APPROVED state
    expect(screen.queryByText('Approve')).not.toBeInTheDocument()
    expect(screen.queryByText('Reject')).not.toBeInTheDocument()
  })

  it('should show Approval flow section', () => {
    render(<App />)
    expect(screen.getByText('Approval flow')).toBeInTheDocument()
  })

  it('should render Navbar', () => {
    render(<App />)
    expect(screen.getByText('Portal')).toBeInTheDocument()
  })

  it('should switch back to NEED_APPROVAL when clicking Need Approval tab', async () => {
    render(<App />)
    // First go to Approved
    await userEvent.click(screen.getByText('Approved'))
    expect(screen.queryByText('Approve')).not.toBeInTheDocument()

    // Then go back to Need Approval
    await userEvent.click(screen.getByText('Need Approval'))
    expect(screen.getByText('Approve')).toBeInTheDocument()
    expect(screen.getByText('Reject')).toBeInTheDocument()
  })
})
