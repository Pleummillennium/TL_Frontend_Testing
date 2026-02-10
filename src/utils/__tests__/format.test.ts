import { describe, it, expect } from 'vitest'
import { formatDate, getInitials, getStatusColor } from '../format'

describe('formatDate', () => {
  it('should format a valid date string', () => {
    expect(formatDate('2026-01-02T09:00:00')).toBe('02/01/2026 09:00:00')
  })

  it('should return "-" for null', () => {
    expect(formatDate(null)).toBe('-')
  })
})

describe('getInitials', () => {
  it('should return initials from full name', () => {
    expect(getInitials('Alex Taylor')).toBe('AT')
  })

  it('should return single initial for one word', () => {
    expect(getInitials('John')).toBe('J')
  })

  it('should return "?" for empty string', () => {
    expect(getInitials('')).toBe('?')
  })

  it('should limit to 2 characters', () => {
    expect(getInitials('John Michael Smith')).toBe('JM')
  })
})

describe('getStatusColor', () => {
  it('should return yellow classes for NEED_APPROVAL', () => {
    expect(getStatusColor('NEED_APPROVAL')).toContain('yellow')
  })

  it('should return green classes for APPROVED', () => {
    expect(getStatusColor('APPROVED')).toContain('green')
  })

  it('should return green classes for SUBMITTED', () => {
    expect(getStatusColor('SUBMITTED')).toContain('green')
  })

  it('should return red classes for REJECTED', () => {
    expect(getStatusColor('REJECTED')).toContain('red')
  })

  it('should return gray fallback for unknown status', () => {
    expect(getStatusColor('UNKNOWN')).toContain('gray')
  })
})
