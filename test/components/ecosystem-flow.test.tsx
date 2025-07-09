import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import EcosystemFlow from '@/components/ecosystem-flow'

// Mock Mermaid library
vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn()
  }
}))

// Import the mocked mermaid to get the actual mock functions
import mermaid from 'mermaid'
const mockMermaid = mermaid as any

describe('EcosystemFlow Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Component Rendering', () => {
    it('renders the main container structure', () => {
      render(<EcosystemFlow />)
      
      const outerContainer = document.querySelector('.flex.justify-center.items-center.w-full')
      const middleContainer = document.querySelector('.w-full.max-w-5xl')
      const mermaidContainer = document.querySelector('.mermaid-container')
      
      expect(outerContainer).toBeInTheDocument()
      expect(middleContainer).toBeInTheDocument()
      expect(mermaidContainer).toBeInTheDocument()
    })

    it('has correct container styling', () => {
      render(<EcosystemFlow />)
      
      const middleContainer = document.querySelector('.w-full.max-w-5xl')
      const mermaidContainer = document.querySelector('.mermaid-container')
      
      expect(middleContainer).toHaveStyle({ 
        minHeight: '500px',
        overflow: 'visible'
      })
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
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Test</svg>' })
      
      render(<EcosystemFlow />)
      
      await waitFor(() => {
        expect(mockMermaid.initialize).toHaveBeenCalledWith({
          startOnLoad: false,
          theme: 'null',
          mindmap: {
            padding: 15,
            useMaxWidth: true,
          },
          themeVariables: {
            primaryColor: 'transparent',
            primaryTextColor: '#1E1C19',
            primaryBorderColor: '#1E1C19',
            lineColor: '#1E1C19',
            secondaryColor: '#A8B7C3',
            background: 'transparent',
            edgeLabelBackground: 'transparent',
            mainBkg: 'transparent',
          },
        })
      })
    })

    it('renders mindmap with correct definition', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Mindmap</svg>' })
      
      render(<EcosystemFlow />)
      
      await waitFor(() => {
        expect(mockMermaid.render).toHaveBeenCalledWith(
          'ecosystem-mindmap',
          expect.stringContaining('mindmap')
        )
        
        const [id, definition] = mockMermaid.render.mock.calls[0]
        expect(id).toBe('ecosystem-mindmap')
        expect(definition).toContain('root(Open-Source Leg)')
      })
    })

    it('updates container with SVG content', async () => {
      const testSvg = '<svg><circle r="10"></circle></svg>'
      mockMermaid.render.mockResolvedValue({ svg: testSvg })
      
      render(<EcosystemFlow />)
      
      await waitFor(() => {
        const container = document.querySelector('.mermaid-container')
        expect(container?.innerHTML).toBe(testSvg)
      })
    })
  })

  describe('Error Handling', () => {
    it('handles mermaid.render errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      mockMermaid.render.mockRejectedValue(new Error('Render failed'))
      
      render(<EcosystemFlow />)
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error rendering mindmap:', expect.any(Error))
      })
      
      const container = document.querySelector('.mermaid-container')
      expect(container).toBeInTheDocument()
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
    })

    it('validates nodeUrlMap structure', async () => {
      const ecosystemData = await import('@/lib/ecosystem-data')
      expect(ecosystemData.nodeUrlMap).toHaveProperty('Collaborative CAD Files')
      expect(ecosystemData.nodeUrlMap).toHaveProperty('Robot CI')
      expect(ecosystemData.nodeUrlMap).toHaveProperty('Python API')
      expect(ecosystemData.nodeUrlMap).toHaveProperty('Publications Database')
    })

    it('validates mermaidConfig structure', async () => {
      const ecosystemData = await import('@/lib/ecosystem-data')
      expect(ecosystemData.mermaidConfig).toHaveProperty('startOnLoad', false)
      expect(ecosystemData.mermaidConfig).toHaveProperty('theme', 'null')
      expect(ecosystemData.mermaidConfig).toHaveProperty('mindmap')
      expect(ecosystemData.mermaidConfig.mindmap).toHaveProperty('padding', 15)
      expect(ecosystemData.mermaidConfig.mindmap).toHaveProperty('useMaxWidth', true)
    })
  })

  describe('Component Lifecycle', () => {
    it('calls mermaid functions in correct order', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Test</svg>' })
      
      render(<EcosystemFlow />)
      
      await waitFor(() => {
        expect(mockMermaid.initialize).toHaveBeenCalledBefore(mockMermaid.render as any)
        expect(mockMermaid.render).toHaveBeenCalledTimes(1)
      })
    })

    it('renders mindmap only once per mount', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Once</svg>' })
      
      render(<EcosystemFlow />)
      
      await waitFor(() => {
        expect(mockMermaid.render).toHaveBeenCalledTimes(1)
      })
      
      // Re-rendering should not trigger another render
      expect(mockMermaid.render).toHaveBeenCalledTimes(1)
    })
  })

  describe('Container Behavior', () => {
    it('maintains proper container hierarchy', () => {
      render(<EcosystemFlow />)
      
      const outerContainer = document.querySelector('.flex.justify-center.items-center.w-full')
      const middleContainer = document.querySelector('.w-full.max-w-5xl')
      const mermaidContainer = document.querySelector('.mermaid-container')
      
      expect(outerContainer?.contains(middleContainer)).toBe(true)
      expect(middleContainer?.contains(mermaidContainer)).toBe(true)
    })

    it('handles empty SVG content gracefully', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '' })
      
      render(<EcosystemFlow />)
      
      await waitFor(() => {
        const container = document.querySelector('.mermaid-container')
        expect(container?.innerHTML).toBe('')
      })
      
      // Component should still be rendered
      expect(document.querySelector('.mermaid-container')).toBeInTheDocument()
    })
  })

  describe('Performance Considerations', () => {
    it('initializes mermaid only once per render', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Perf Test</svg>' })
      
      render(<EcosystemFlow />)
      
      await waitFor(() => {
        expect(mockMermaid.initialize).toHaveBeenCalledTimes(1)
      })
    })

    it('renders mindmap only once per render', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Render Once</svg>' })
      
      render(<EcosystemFlow />)
      
      await waitFor(() => {
        expect(mockMermaid.render).toHaveBeenCalledTimes(1)
      })
    })
  })
}) 