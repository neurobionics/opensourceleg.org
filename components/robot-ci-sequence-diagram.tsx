'use client';

import { useEffect, useRef } from 'react';

export default function RobotCISequenceDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMermaid = async () => {
      try {
        // Dynamically import mermaid to avoid SSR issues
        const mermaid = (await import('mermaid')).default;
        
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: '#ffffff',
            primaryTextColor: '#000000',
            primaryBorderColor: '#000000',
            lineColor: '#000000',
            sectionBkgColor: '#f8f9fa',
            altSectionBkgColor: '#ffffff',
            gridColor: '#e9ecef',
            c0: '#ffffff',
            c1: '#f8f9fa',
            c2: '#e9ecef',
            c3: '#dee2e6',
            cScale0: '#ffffff',
            cScale1: '#f8f9fa',
            cScale2: '#e9ecef',
            actorBkg: '#ffffff',
            actorBorder: '#000000',
            actorTextColor: '#000000',
            actorLineColor: '#000000',
            signalColor: '#000000',
            signalTextColor: '#000000',
            messageLine0Color: '#000000',
            messageLine1Color: '#000000',
            messageText0Color: '#000000',
            messageText1Color: '#000000',
            loopTextColor: '#000000',
            activationBkgColor: '#e9ecef',
            activationBorderColor: '#000000',
            sequenceNumberColor: '#ffffff'
          }
        });

        const diagramDefinition = `
sequenceDiagram
    participant R as User
    participant G as GitHub Repository
    participant GA as GitHub Actions
    participant RPi as Raspberry Pi
    participant E as Email Service
    participant VS as VSCode, Cursor, etc

    Note over R,VS: Robot CI Workflow

    R->>G: 1. Fork/clone robot-ci repository
    R->>G: 2. Configure secrets (WiFi, SMTP, etc.)
    R->>G: 3. Customize packages & settings
    
    R->>GA: 4. Trigger build workflow
    Note over GA: Building custom OS image...
    GA->>GA: 5. Download base OS (Raspbian/Ubuntu)
    GA->>GA: 6. Install packages & configure services
    GA->>GA: 7. Setup users & network settings
    GA->>G: 8. Upload image as artifact
    
    R->>G: 9. Download built image
    R->>RPi: 10. Flash image to SD card & boot
    
    Note over RPi: First boot setup...
    RPi->>RPi: 11. Connect to configured networks
    RPi->>E: 12. Send IP address notification
    E->>R: 13. Email with Pi IP address
    
    R->>VS: 14. Connect via Remote SSH
    VS->>RPi: 15. Establish SSH connection
    Note over R,RPi: Ready for remote development!
        `;

        if (diagramRef.current) {
          const { svg } = await mermaid.render('robot-ci-sequence', diagramDefinition);
          diagramRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
        if (diagramRef.current) {
          diagramRef.current.innerHTML = '<p class="text-gray-500 text-center">Diagram could not be loaded</p>';
        }
      }
    };

    loadMermaid();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-transparent">
        <div 
          ref={diagramRef} 
          className="flex justify-center items-center min-h-[400px]"
          style={{ fontSize: '14px' }}
        >
          <p className="text-gray-500">Loading diagram...</p>
        </div>
        <p className="text-xs text-gray-600 mt-4 text-center italic">
          Sequence diagram demonstrating the complete workflow from repository setup to establishing a remote development connection.
        </p>
      </div>
    </div>
  );
} 