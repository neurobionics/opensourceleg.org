import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import EcosystemFlow from '@/components/ecosystem-flow'

// Mock Mermaid library
vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn()
  }
}))

// Mock ecosystem-data
vi.mock('@/lib/ecosystem-data', () => ({
  mindmapDefinition: `
mindmap
  root(Open-Source Leg)
    ((Hardware))
      (Collaborative CAD Files)
      (Bill of Materials)
    ((Software))
      (Robot CI)
      (Python API)
`,
  nodeUrlMap: {
    'Collaborative CAD Files': 'https://cad.onshape.com/documents/test',
    'Bill of Materials': 'https://docs.google.com/spreadsheets/test',
    'Robot CI': 'https://github.com/neurobionics/robot-ci',
    'Python API': 'https://github.com/neurobionics/opensourceleg'
  },
  mermaidConfig: {
    startOnLoad: false,
    theme: 'null' as const,
    mindmap: {
      padding: 15,
      useMaxWidth: true
    },
    themeVariables: {
      primaryColor: 'transparent',
      primaryTextColor: '#1E1C19',
      primaryBorderColor: '#1E1C19',
      lineColor: '#1E1C19',
      secondaryColor: '#A8B7C3',
      background: 'transparent',
      edgeLabelBackground: 'transparent',
      mainBkg: 'transparent'
    }
  }
}))

describe('EcosystemFlow Component', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    const mermaid = await import('mermaid')
    ;(mermaid.default.render as any).mockResolvedValue({ svg: '<svg><text>Test</text></svg>' })
    // Mock window.open
    Object.defineProperty(window, 'open', {
      writable: true,
      value: vi.fn()
    })
  })

  describe('Component Rendering', () => {
    it('renders the main container structure', () => {
      render(<EcosystemFlow />)
      
      const outerContainer = document.querySelector('.flex.justify-center.items-center.w-full')
      expect(outerContainer).toBeInTheDocument()
      
      const maxWidthContainer = document.querySelector('.w-full.max-w-5xl.mx-auto')
      expect(maxWidthContainer).toBeInTheDocument()
      
      const mermaidContainer = document.querySelector('.mermaid-container')
      expect(mermaidContainer).toBeInTheDocument()
    })

    it('has correct container styling', () => {
      render(<EcosystemFlow />)
      
      const maxWidthContainer = document.querySelector('.w-full.max-w-5xl.mx-auto')
      expect(maxWidthContainer).toHaveStyle({
        minHeight: '500px',
        overflow: 'visible'
      })
      
      const mermaidContainer = document.querySelector('.mermaid-container')
      expect(mermaidContainer).toHaveStyle({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
      })
    })
  })

  describe('Mermaid Integration', () => {
    it('initializes Mermaid with correct configuration', async () => {
      render(<EcosystemFlow />)
      
      const mermaid = await import('mermaid')
      const ecosystemData = await import('@/lib/ecosystem-data')
      await waitFor(() => {
        expect(mermaid.default.initialize).toHaveBeenCalledWith(ecosystemData.mermaidConfig)
      })
    })

    it('renders mindmap with correct definition', async () => {
      render(<EcosystemFlow />)
      
      const mermaid = await import('mermaid')
      const ecosystemData = await import('@/lib/ecosystem-data')
      await waitFor(() => {
        expect(mermaid.default.render).toHaveBeenCalledWith('ecosystem-mindmap', ecosystemData.mindmapDefinition)
      })
    })

    it('updates container with SVG content', async () => {
      const mockSvg = '<svg><g class="mindmap-node"><text>Test Node</text></g></svg>'
      const mermaid = await import('mermaid')
      ;(mermaid.default.render as any).mockResolvedValue({ svg: mockSvg })
      
      render(<EcosystemFlow />)
      
      await waitFor(() => {
        const container = document.querySelector('.mermaid-container')
        expect(container?.innerHTML).toBe(mockSvg)
      })
    })
  })

  describe('Error Handling', () => {
    it('handles mermaid.render errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const mermaid = await import('mermaid')
      ;(mermaid.default.render as any).mockRejectedValue(new Error('Rendering failed'))
      
      render(<EcosystemFlow />)
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error rendering mindmap:', expect.any(Error))
      })
      
      consoleSpy.mockRestore()
    })

    it('handles missing mermaidConfig gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      // Temporarily mock missing config
      vi.doMock('@/lib/ecosystem-data', () => ({
        mindmapDefinition: `mindmap\n  root(Open-Source Leg)`,
        nodeUrlMap: {},
        mermaidConfig: null
      }))
      
      // This test verifies the error handling for missing config
      render(<EcosystemFlow />)
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('mermaidConfig is not available')
      })
      
      consoleSpy.mockRestore()
    })
  })

  describe('Data Structure Validation', () => {
    it('uses correct mindmap definition format', async () => {
      const ecosystemData = await import('@/lib/ecosystem-data')
      expect(ecosystemData.mindmapDefinition).toContain('mindmap')
      expect(ecosystemData.mindmapDefinition).toContain('root(Open-Source Leg)')
      expect(ecosystemData.mindmapDefinition).toContain('((Hardware))')
      expect(ecosystemData.mindmapDefinition).toContain('((Software))')
      expect(ecosystemData.mindmapDefinition).toContain('(Collaborative CAD Files)')
      expect(ecosystemData.mindmapDefinition).toContain('(Robot CI)')
    })

    it('validates nodeUrlMap structure', async () => {
      const ecosystemData = await import('@/lib/ecosystem-data')
      expect(ecosystemData.nodeUrlMap).toHaveProperty('Collaborative CAD Files')
      expect(ecosystemData.nodeUrlMap).toHaveProperty('Robot CI')
      expect(ecosystemData.nodeUrlMap).toHaveProperty('Python API')
      expect(ecosystemData.nodeUrlMap['Collaborative CAD Files']).toContain('https://')
      expect(ecosystemData.nodeUrlMap['Robot CI']).toContain('github.com')
    })

    it('validates mermaidConfig structure', async () => {
      const ecosystemData = await import('@/lib/ecosystem-data')
      expect(ecosystemData.mermaidConfig).toHaveProperty('startOnLoad', false)
      expect(ecosystemData.mermaidConfig).toHaveProperty('theme', 'null')
      expect(ecosystemData.mermaidConfig).toHaveProperty('mindmap')
      expect(ecosystemData.mermaidConfig).toHaveProperty('themeVariables')
      expect(ecosystemData.mermaidConfig.mindmap).toHaveProperty('padding', 15)
      expect(ecosystemData.mermaidConfig.mindmap).toHaveProperty('useMaxWidth', true)
    })
  })

  describe('Component Lifecycle', () => {
    it('calls mermaid functions in correct order', async () => {
      render(<EcosystemFlow />)
      
      const mermaid = await import('mermaid')
      await waitFor(() => {
        expect(mermaid.default.initialize).toHaveBeenCalledBefore(mermaid.default.render as any)
      })
    })

    it('handles multiple renders without errors', async () => {
      const { rerender } = render(<EcosystemFlow />)
      
      const mermaid = await import('mermaid')
      await waitFor(() => {
        expect(mermaid.default.render).toHaveBeenCalledTimes(1)
      })
      
      rerender(<EcosystemFlow />)
      
      await waitFor(() => {
        expect(mermaid.default.render).toHaveBeenCalledTimes(2)
      })
    })
  })

  describe('Container Behavior', () => {
    it('maintains proper container hierarchy', () => {
      render(<EcosystemFlow />)
      
      const outerContainer = document.querySelector('.flex.justify-center.items-center.w-full') as HTMLElement
      const maxWidthContainer = document.querySelector('.w-full.max-w-5xl.mx-auto') as HTMLElement
      const mermaidContainer = document.querySelector('.mermaid-container') as HTMLElement
      
      expect(outerContainer).toContainElement(maxWidthContainer)
      expect(maxWidthContainer).toContainElement(mermaidContainer)
    })

    it('handles empty SVG content gracefully', async () => {
      const mermaid = await import('mermaid')
      ;(mermaid.default.render as any).mockResolvedValue({ svg: '' })
      
      render(<EcosystemFlow />)
      
      await waitFor(() => {
        const container = document.querySelector('.mermaid-container')
        expect(container?.innerHTML).toBe('')
      })
    })
  })

  describe('Performance Considerations', () => {
    it('initializes mermaid only once per render', async () => {
      render(<EcosystemFlow />)
      
      const mermaid = await import('mermaid')
      await waitFor(() => {
        expect(mermaid.default.initialize).toHaveBeenCalledTimes(1)
      })
    })

    it('renders mindmap only once per render', async () => {
      render(<EcosystemFlow />)
      
      const mermaid = await import('mermaid')
      await waitFor(() => {
        expect(mermaid.default.render).toHaveBeenCalledTimes(1)
      })
    })
  })
}) 