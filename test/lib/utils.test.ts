import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('Utils', () => {
  describe('cn function', () => {
    it('merges class names correctly', () => {
      const result = cn('px-4', 'py-2', 'bg-blue-500')
      expect(result).toBe('px-4 py-2 bg-blue-500')
    })

    it('handles conditional classes', () => {
      const isActive = true
      const result = cn('base-class', isActive && 'active-class', !isActive && 'inactive-class')
      expect(result).toBe('base-class active-class')
    })

    it('deduplicates conflicting Tailwind classes', () => {
      const result = cn('px-4', 'px-6')
      expect(result).toBe('px-6')
    })

    it('handles undefined and null values', () => {
      const result = cn('px-4', undefined, null, 'py-2')
      expect(result).toBe('px-4 py-2')
    })

    it('handles empty strings', () => {
      const result = cn('px-4', '', 'py-2')
      expect(result).toBe('px-4 py-2')
    })

    it('handles arrays of classes', () => {
      const result = cn(['px-4', 'py-2'], 'bg-blue-500')
      expect(result).toBe('px-4 py-2 bg-blue-500')
    })

    it('handles objects with conditional classes', () => {
      const result = cn({
        'px-4': true,
        'py-2': true,
        'bg-red-500': false,
        'bg-blue-500': true
      })
      expect(result).toBe('px-4 py-2 bg-blue-500')
    })
  })
}) 