import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SystemOverviewDiagram from '@/components/system-overview-diagram'

// Mock Mermaid library
vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn()
  }
}))

// Mock system-overview data
vi.mock('@/lib/hardware/system-overview', () => ({
  mermaidSystemDiagram: `
flowchart TD
    RPI("Raspberry Pi<br/>(CM / Jetson Nano)")
    
    subgraph KNEE_SYSTEM ["Knee Joint"]
        direction TB
        KBAT("LiPo 9S<br/>Battery Pack<br/>33.3V")
        KA("Actuator<br/>Motor + 9:1 Gearbox<br/>(Dephy / TMotor)")
        KBD("5.44:1<br/>Belt Drive<br/>Transmission System")
        KE("Knee Joint Encoder")
        
        KBAT ==>|"Power<br/>33.3V"| KA
        KA -->|"Motor<br/>Torque"| KBD
        KBD --> KE
    end
    
    HUMAN("Human Subject")
    KBD ==>|"Joint<br/>Torque"| HUMAN
    KE -.->|"Joint<br/>Position &<br/>Velocity"| RPI
`
}))

describe('SystemOverviewDiagram Component', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    const mermaid = await import('mermaid')
    ;(mermaid.default.render as any).mockResolvedValue({ svg: '<svg><text>System Overview</text></svg>' })
  })

  describe('Component Rendering', () => {
    it('renders the main container structure', () => {
      render(<SystemOverviewDiagram />)
      
      const outerContainer = document.querySelector('.flex.justify-center.items-center.w-full')
      expect(outerContainer).toBeInTheDocument()
      
      const maxWidthContainer = document.querySelector('.w-full.max-w-6xl.mx-auto')
      expect(maxWidthContainer).toBeInTheDocument()
      
      const mermaidContainer = document.querySelector('.mermaid-container')
      expect(mermaidContainer).toBeInTheDocument()
    })

    it('has correct container styling', () => {
      render(<SystemOverviewDiagram />)
      
      const maxWidthContainer = document.querySelector('.w-full.max-w-6xl.mx-auto')
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

    it('uses max-w-6xl for larger diagrams', () => {
      render(<SystemOverviewDiagram />)
      
      const maxWidthContainer = document.querySelector('.w-full.max-w-6xl.mx-auto')
      expect(maxWidthContainer).toBeInTheDocument()
      expect(maxWidthContainer).toHaveClass('max-w-6xl')
    })
  })

  describe('Mermaid Integration', () => {
    it('initializes Mermaid with correct configuration', async () => {
      render(<SystemOverviewDiagram />)
      
      const mermaid = await import('mermaid')
      await waitFor(() => {
        expect(mermaid.default.initialize).toHaveBeenCalledWith({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            background: '#ffffff',
            primaryColor: '#8594E8',
            primaryTextColor: '#1E1C19',
            primaryBorderColor: '#1E1C19',
            lineColor: '#1E1C19',
            secondaryColor: '#CADA9D',
            tertiaryColor: '#f9f9f9',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '11px',
            edgeLabelBackground: '#F2F5CF'
          },
          block: {
            padding: 20,
            useMaxWidth: true
          },
          flowchart: {
            padding: 20,
            nodeSpacing: 50,
            rankSpacing: 60,
            curve: 'basis'
          }
        })
      })
    })

    it('renders system diagram with correct definition', async () => {
      render(<SystemOverviewDiagram />)
      
      const mermaid = await import('mermaid')
      const systemOverview = await import('@/lib/hardware/system-overview')
      await waitFor(() => {
        expect(mermaid.default.render).toHaveBeenCalledWith('system-overview-diagram', systemOverview.mermaidSystemDiagram)
      })
    })

    it('updates container with SVG content', async () => {
      const mockSvg = '<svg><g class="node"><text>Raspberry Pi</text></g></svg>'
      const mermaid = await import('mermaid')
      ;(mermaid.default.render as any).mockResolvedValue({ svg: mockSvg })
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        const container = document.querySelector('.mermaid-container')
        expect(container?.innerHTML).toBe(mockSvg)
      })
    })

    it('handles complex SVG with multiple system components', async () => {
      const complexSvg = `
        <svg>
          <g class="node" id="RPI"><text>Raspberry Pi</text></g>
          <g class="cluster" id="KNEE_SYSTEM"><text>Knee Joint</text></g>
          <g class="node" id="KBAT"><text>LiPo 9S Battery Pack</text></g>
          <g class="node" id="KA"><text>Actuator</text></g>
          <g class="node" id="HUMAN"><text>Human Subject</text></g>
        </svg>
      `
      const mermaid = await import('mermaid')
      ;(mermaid.default.render as any).mockResolvedValue({ svg: complexSvg })
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        const container = document.querySelector('.mermaid-container')
        expect(container?.innerHTML).toContain('Raspberry Pi')
        expect(container?.innerHTML).toContain('Knee Joint')
        expect(container?.innerHTML).toContain('LiPo 9S Battery Pack')
        expect(container?.innerHTML).toContain('Actuator')
        expect(container?.innerHTML).toContain('Human Subject')
      })
    })
  })

  describe('Error Handling', () => {
    it('handles mermaid.render errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const mermaid = await import('mermaid')
      ;(mermaid.default.render as any).mockRejectedValue(new Error('Rendering failed'))
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error rendering system overview diagram:', expect.any(Error))
      })
      
      consoleSpy.mockRestore()
    })

    it('handles empty SVG content gracefully', async () => {
      const mermaid = await import('mermaid')
      ;(mermaid.default.render as any).mockResolvedValue({ svg: '' })
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        const container = document.querySelector('.mermaid-container')
        expect(container?.innerHTML).toBe('')
      })
    })

    it('handles malformed SVG content gracefully', async () => {
      const mermaid = await import('mermaid')
      ;(mermaid.default.render as any).mockResolvedValue({ svg: '<svg><invalid>content</invalid></svg>' })
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        const container = document.querySelector('.mermaid-container')
        expect(container?.innerHTML).toBe('<svg><invalid>content</invalid></svg>')
      })
    })
  })

  describe('Diagram Content Validation', () => {
    it('validates flowchart diagram definition format', async () => {
      const systemOverview = await import('@/lib/hardware/system-overview')
      expect(systemOverview.mermaidSystemDiagram).toContain('flowchart TD')
      expect(systemOverview.mermaidSystemDiagram).toContain('RPI("Raspberry Pi')
      expect(systemOverview.mermaidSystemDiagram).toContain('subgraph KNEE_SYSTEM')
      expect(systemOverview.mermaidSystemDiagram).toContain('HUMAN("Human Subject")')
    })

    it('validates system components are present', async () => {
      const systemOverview = await import('@/lib/hardware/system-overview')
      const diagram = systemOverview.mermaidSystemDiagram
      
      // Control system components
      expect(diagram).toContain('Raspberry Pi')
      expect(diagram).toContain('Jetson Nano')
      
      // Joint systems
      expect(diagram).toContain('Knee Joint')
      expect(diagram).toContain('Ankle Joint')
      
      // Power components
      expect(diagram).toContain('LiPo 9S')
      expect(diagram).toContain('Battery Pack')
      expect(diagram).toContain('33.3V')
      
      // Actuator components
      expect(diagram).toContain('Actuator')
      expect(diagram).toContain('Motor + 9:1 Gearbox')
      expect(diagram).toContain('Dephy / TMotor')
      
      // Transmission components
      expect(diagram).toContain('Belt Drive')
      expect(diagram).toContain('Transmission System')
      
      // Sensors
      expect(diagram).toContain('Encoder')
      expect(diagram).toContain('Load Cell')
      expect(diagram).toContain('IMU, EMG')
      
      // Human interface
      expect(diagram).toContain('Human Subject')
    })

    it('validates system connections are defined', async () => {
      const systemOverview = await import('@/lib/hardware/system-overview')
      const diagram = systemOverview.mermaidSystemDiagram
      
      // Power connections
      expect(diagram).toContain('Power<br/>33.3V')
      expect(diagram).toContain('Power<br/>5V')
      
      // Motor connections
      expect(diagram).toContain('Motor<br/>Commands')
      expect(diagram).toContain('Motor<br/>Torque')
      
      // Joint connections
      expect(diagram).toContain('Joint<br/>Torque')
      expect(diagram).toContain('Joint<br/>Position &<br/>Velocity')
      
      // Sensor connections
      expect(diagram).toContain('Sensor<br/>Data')
      expect(diagram).toContain('Ground Reaction Forces &<br/>Moments')
    })

    it('validates system styling classes are defined', async () => {
      const systemOverview = await import('@/lib/hardware/system-overview')
      const diagram = systemOverview.mermaidSystemDiagram
      
      // Component styling classes
      expect(diagram).toContain('classDef electricalItem')
      expect(diagram).toContain('classDef controlItem')
      expect(diagram).toContain('classDef actuationItem')
      expect(diagram).toContain('classDef transmissionItem')
      expect(diagram).toContain('classDef sensingItem')
      expect(diagram).toContain('classDef jointSystem')
      expect(diagram).toContain('classDef humanSubject')
      
      // Class assignments
      expect(diagram).toContain('class KBAT,ABAT electricalItem')
      expect(diagram).toContain('class RPI controlItem')
      expect(diagram).toContain('class KA,AA actuationItem')
      expect(diagram).toContain('class HUMAN humanSubject')
    })
  })

  describe('Component Lifecycle', () => {
    it('calls mermaid functions in correct order', async () => {
      render(<SystemOverviewDiagram />)
      
      const mermaid = await import('mermaid')
      await waitFor(() => {
        expect(mermaid.default.initialize).toHaveBeenCalledBefore(mermaid.default.render as any)
      })
    })

    it('handles multiple renders without errors', async () => {
      const { rerender } = render(<SystemOverviewDiagram />)
      
      const mermaid = await import('mermaid')
      await waitFor(() => {
        expect(mermaid.default.render).toHaveBeenCalledTimes(1)
      })
      
      rerender(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        expect(mermaid.default.render).toHaveBeenCalledTimes(2)
      })
    })

    it('initializes mermaid only once per render', async () => {
      render(<SystemOverviewDiagram />)
      
      const mermaid = await import('mermaid')
      await waitFor(() => {
        expect(mermaid.default.initialize).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Container Behavior', () => {
    it('maintains proper container hierarchy', () => {
      render(<SystemOverviewDiagram />)
      
      const outerContainer = document.querySelector('.flex.justify-center.items-center.w-full') as HTMLElement
      const maxWidthContainer = document.querySelector('.w-full.max-w-6xl.mx-auto') as HTMLElement
      const mermaidContainer = document.querySelector('.mermaid-container') as HTMLElement
      
      expect(outerContainer).toContainElement(maxWidthContainer)
      expect(maxWidthContainer).toContainElement(mermaidContainer)
    })

    it('handles container resizing gracefully', () => {
      render(<SystemOverviewDiagram />)
      
      const maxWidthContainer = document.querySelector('.w-full.max-w-6xl.mx-auto')
      expect(maxWidthContainer).toHaveStyle({
        minHeight: '500px',
        overflow: 'visible'
      })
    })
  })

  describe('Mermaid Configuration', () => {
    it('uses correct theme configuration', async () => {
      render(<SystemOverviewDiagram />)
      
      const mermaid = await import('mermaid')
      await waitFor(() => {
        expect(mermaid.default.initialize).toHaveBeenCalledWith(
          expect.objectContaining({
            theme: 'base',
            themeVariables: expect.objectContaining({
              background: '#ffffff',
              primaryColor: '#8594E8',
              primaryTextColor: '#1E1C19',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '11px'
            })
          })
        )
      })
    })

    it('uses correct flowchart configuration', async () => {
      render(<SystemOverviewDiagram />)
      
      const mermaid = await import('mermaid')
      await waitFor(() => {
        expect(mermaid.default.initialize).toHaveBeenCalledWith(
          expect.objectContaining({
            flowchart: {
              padding: 20,
              nodeSpacing: 50,
              rankSpacing: 60,
              curve: 'basis'
            }
          })
        )
      })
    })

    it('uses correct block configuration', async () => {
      render(<SystemOverviewDiagram />)
      
      const mermaid = await import('mermaid')
      await waitFor(() => {
        expect(mermaid.default.initialize).toHaveBeenCalledWith(
          expect.objectContaining({
            block: {
              padding: 20,
              useMaxWidth: true
            }
          })
        )
      })
    })
  })

  describe('Performance Considerations', () => {
    it('renders diagram only once per mount', async () => {
      render(<SystemOverviewDiagram />)
      
      const mermaid = await import('mermaid')
      await waitFor(() => {
        expect(mermaid.default.render).toHaveBeenCalledTimes(1)
      })
    })

    it('uses unique diagram ID', async () => {
      render(<SystemOverviewDiagram />)
      
      const mermaid = await import('mermaid')
      await waitFor(() => {
        expect(mermaid.default.render).toHaveBeenCalledWith('system-overview-diagram', expect.any(String))
      })
    })
  })
}) 