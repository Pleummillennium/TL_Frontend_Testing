import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ActionButtons from '../ActionButtons'

const defaultPermissions = { canApprove: true, canReject: true, canDuplicate: true }

describe('ActionButtons', () => {
  it('should render both buttons when canApprove and canReject are true', () => {
    render(<ActionButtons permissions={defaultPermissions} status="NEED_APPROVAL" />)
    expect(screen.getByText('Approve')).toBeInTheDocument()
    expect(screen.getByText('Reject')).toBeInTheDocument()
  })

  it('should hide Approve button when canApprove is false', () => {
    render(<ActionButtons permissions={{ ...defaultPermissions, canApprove: false }} status="NEED_APPROVAL" />)
    expect(screen.queryByText('Approve')).not.toBeInTheDocument()
    expect(screen.getByText('Reject')).toBeInTheDocument()
  })

  it('should hide Reject button when canReject is false', () => {
    render(<ActionButtons permissions={{ ...defaultPermissions, canReject: false }} status="NEED_APPROVAL" />)
    expect(screen.getByText('Approve')).toBeInTheDocument()
    expect(screen.queryByText('Reject')).not.toBeInTheDocument()
  })

  it('should render nothing when both permissions are false', () => {
    const { container } = render(
      <ActionButtons permissions={{ canApprove: false, canReject: false, canDuplicate: true }} status="NEED_APPROVAL" />
    )
    expect(container.innerHTML).toBe('')
  })

  it('should render nothing when status is APPROVED', () => {
    const { container } = render(
      <ActionButtons permissions={defaultPermissions} status="APPROVED" />
    )
    expect(container.innerHTML).toBe('')
  })

  it('should call console.log when Approve is clicked', async () => {
    const spy = vi.spyOn(console, 'log')
    render(<ActionButtons permissions={defaultPermissions} status="NEED_APPROVAL" />)
    await userEvent.click(screen.getByText('Approve'))
    expect(spy).toHaveBeenCalledWith('Approve clicked')
    spy.mockRestore()
  })

  it('should call console.log when Reject is clicked', async () => {
    const spy = vi.spyOn(console, 'log')
    render(<ActionButtons permissions={defaultPermissions} status="NEED_APPROVAL" />)
    await userEvent.click(screen.getByText('Reject'))
    expect(spy).toHaveBeenCalledWith('Reject clicked')
    spy.mockRestore()
  })
})
