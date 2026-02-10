import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import RequestDetails from '../RequestDetails'
import type { RequestData } from '../../../types/request'

const defaultDetails: RequestData['details'] = {
  company: { id: 'c1', name: 'ACME Corp' },
  requestType: { code: 'PO', label: 'Purchase order' },
  linkedRequests: [
    { id: 'CA-PR-26010001', type: 'PR' },
    { id: 'CA-PR-26010002', type: 'PR' },
  ],
}

describe('RequestDetails', () => {
  it('should render company name', () => {
    render(<RequestDetails title="Test Title" details={defaultDetails} />)
    expect(screen.getByText('ACME Corp')).toBeInTheDocument()
  })

  it('should render request type label', () => {
    render(<RequestDetails title="Test Title" details={defaultDetails} />)
    expect(screen.getByText('Purchase order')).toBeInTheDocument()
  })

  it('should render the title', () => {
    render(<RequestDetails title="Office Supplies Q1" details={defaultDetails} />)
    expect(screen.getByText('Office Supplies Q1')).toBeInTheDocument()
  })

  it('should render linked request tags when present', () => {
    render(<RequestDetails title="Test" details={defaultDetails} />)
    expect(screen.getByText('CA-PR-26010001')).toBeInTheDocument()
    expect(screen.getByText('CA-PR-26010002')).toBeInTheDocument()
  })

  it('should render "-" when linkedRequests is empty', () => {
    const details = { ...defaultDetails, linkedRequests: [] }
    render(<RequestDetails title="Test" details={details} />)
    expect(screen.getByText('-')).toBeInTheDocument()
  })

  it('should render all section labels', () => {
    render(<RequestDetails title="Test" details={defaultDetails} />)
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Request type')).toBeInTheDocument()
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Linked request')).toBeInTheDocument()
  })
})
