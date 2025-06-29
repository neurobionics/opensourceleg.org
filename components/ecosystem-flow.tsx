'use client';

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { mindmapDefinition, nodeUrlMap, mermaidConfig } from '@/lib/ecosystem-data';



export default function EcosystemFlow() {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Mermaid with configuration
    if (!mermaidConfig) {
      console.error('mermaidConfig is not available');
      return;
    }
    mermaid.initialize(mermaidConfig);

    const renderMindmap = async () => {
      if (mermaidRef.current) {
        try {
          const { svg } = await mermaid.render('ecosystem-mindmap', mindmapDefinition);
          mermaidRef.current.innerHTML = svg;
          
          // Add click handlers to mindmap nodes and sections
          setTimeout(() => {
            const svgElement = mermaidRef.current?.querySelector('svg');
            if (svgElement) {
              // Find all mindmap-node and section-* elements
              const nodeElements = svgElement.querySelectorAll('.mindmap-node, [class*="section-"]');
              
              nodeElements.forEach((nodeElement) => {
                // Get the text content from the node to match with URLs
                const textElement = nodeElement.querySelector('text');
                const textContent = textElement?.textContent?.trim();
                
                if (textContent && nodeUrlMap[textContent]) {
                  // Add a class for styling
                  nodeElement.classList.add('clickable-node');
                  
                  // Add tabindex for keyboard accessibility
                  nodeElement.setAttribute('tabindex', '0');
                  nodeElement.setAttribute('role', 'button');
                  nodeElement.setAttribute('aria-label', `Navigate to ${textContent}`);
                  
                                     // Remove any existing handlers to prevent duplicates
                   const element = nodeElement as SVGElement & { 
                     _clickHandler?: (e: Event) => void;
                     _keyHandler?: (e: Event) => void;
                   };
                   
                   if (element._clickHandler) {
                     nodeElement.removeEventListener('click', element._clickHandler);
                   }
                   if (element._keyHandler) {
                     nodeElement.removeEventListener('keydown', element._keyHandler);
                   }
                   
                   // Create handlers
                   const openUrl = () => {
                     window.open(nodeUrlMap[textContent], '_blank', 'noopener,noreferrer');
                   };
                   
                   const clickHandler = (e: Event) => {
                     e.preventDefault();
                     e.stopPropagation();
                     openUrl();
                   };
                   
                   const keyHandler = (e: Event) => {
                     const keyboardEvent = e as KeyboardEvent;
                     if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
                       e.preventDefault();
                       e.stopPropagation();
                       openUrl();
                     }
                   };
                   
                   // Store references and add handlers
                   element._clickHandler = clickHandler;
                   element._keyHandler = keyHandler;
                   nodeElement.addEventListener('click', clickHandler);
                   nodeElement.addEventListener('keydown', keyHandler);
                }
              });
            }
          }, 200); // Slightly longer timeout to ensure DOM is ready
        } catch (error) {
          console.error('Error rendering mindmap:', error);
        }
      }
    };

    renderMindmap();
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <div 
        className="w-full max-w-5xl mx-auto"
        style={{ 
          minHeight: '500px',
          overflow: 'visible'
        }}
      >
        <div 
          ref={mermaidRef}
          className="mermaid-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    </div>
  );
} 