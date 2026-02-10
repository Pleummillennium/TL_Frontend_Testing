import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from '../Badge'

describe('Badge', () => {
  it('should render label text for NEED_APPROVAL', () => {
    render(<Badge status="NEED_APPROVAL" label="Need approval" />)
    expect(screen.getByText('Need approval')).toBeInTheDocument()
  })

  it('should render label text for APPROVED', () => {
    render(<Badge status="APPROVED" label="Approved" />)
    expect(screen.getByText('Approved')).toBeInTheDocument()
  })

  it('should not crash with unknown status', () => {
    render(<Badge status="UNKNOWN_STATUS" label="Unknown" />)
    expect(screen.getByText('Unknown')).toBeInTheDocument()
  })
})
