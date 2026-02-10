import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ApprovalStep from '../ApprovalStep'
import type { ApprovalStep as ApprovalStepType } from '../../../types/request'

const baseStep: ApprovalStepType = {
  id: 'step-1',
  order: 1,
  user: { id: 'u1', name: 'Alex Taylor', title: 'Manager' },
  companyTag: 'COMPANY A',
  role: 'APPROVER',
  status: 'APPROVED',
  statusLabel: 'Approved',
  actedAt: '2026-01-03T14:30:00',
}

describe('ApprovalStep', () => {
  it('should render user name and title', () => {
    render(<ApprovalStep step={baseStep} isLast={false} />)
    expect(screen.getByText('Alex Taylor')).toBeInTheDocument()
    expect(screen.getByText('Manager')).toBeInTheDocument()
  })

  it('should render company tag', () => {
    render(<ApprovalStep step={baseStep} isLast={false} />)
    expect(screen.getByText('COMPANY A')).toBeInTheDocument()
  })

  it('should render status badge', () => {
    render(<ApprovalStep step={baseStep} isLast={false} />)
    expect(screen.getByText('Approved')).toBeInTheDocument()
  })

  it('should render role badge for APPROVER', () => {
    render(<ApprovalStep step={baseStep} isLast={false} />)
    expect(screen.getByText('Approver')).toBeInTheDocument()
  })

  it('should render role badge for REVIEWER', () => {
    const step = { ...baseStep, role: 'REVIEWER' as const, statusLabel: 'Under review' }
    render(<ApprovalStep step={step} isLast={false} />)
    expect(screen.getByText('Reviewer')).toBeInTheDocument()
  })

  it('should NOT render role badge for SUBMITTER', () => {
    const step = { ...baseStep, role: 'SUBMITTER' as const }
    render(<ApprovalStep step={step} isLast={false} />)
    expect(screen.queryByText('Submitter')).not.toBeInTheDocument()
  })

  it('should render formatted date when actedAt is provided', () => {
    render(<ApprovalStep step={baseStep} isLast={false} />)
    expect(screen.getByText('03/01/2026 14:30:00')).toBeInTheDocument()
  })

  it('should NOT render date when actedAt is null', () => {
    const step = { ...baseStep, actedAt: null }
    render(<ApprovalStep step={step} isLast={false} />)
    expect(screen.queryByText(/\d{2}\/\d{2}\/\d{4}/)).not.toBeInTheDocument()
  })

  it('should render connecting line when isLast is false', () => {
    const { container } = render(<ApprovalStep step={baseStep} isLast={false} />)
    const line = container.querySelector('.bg-gray-200.w-px')
    expect(line).toBeInTheDocument()
  })

  it('should NOT render connecting line when isLast is true', () => {
    const { container } = render(<ApprovalStep step={baseStep} isLast={true} />)
    const line = container.querySelector('.bg-gray-200.w-px')
    expect(line).not.toBeInTheDocument()
  })

  it('should not render user title when title is undefined', () => {
    const step = { ...baseStep, user: { id: 'u1', name: 'Alex Taylor' } }
    render(<ApprovalStep step={step} isLast={false} />)
    expect(screen.getByText('Alex Taylor')).toBeInTheDocument()
    // Only the name should exist, no title paragraph
    const paragraphs = screen.queryAllByText((_content, element) => {
      return element?.tagName === 'P' && element?.classList.contains('text-xs') && element?.classList.contains('text-gray-500') && element?.classList.contains('truncate') || false
    })
    expect(paragraphs).toHaveLength(0)
  })
})
