// Ecosystem data for the Open-Source Leg project graph visualization

export interface EcosystemNode {
  id: string;
  label: string;
  url?: string;
  size?: number;
  color?: string;
  subLabel?: string;
}

export interface EcosystemEdge {
  id: string;
  source: string;
  target: string;
}

// Define all the nodes in the ecosystem
export const ecosystemNodes: EcosystemNode[] = [
  // Root node
  {
    id: 'root',
    label: 'Open-Source Leg Ecosystem',
    size: 20,
    color: '#1f2937'
  },
  
  // Main category nodes
  {
    id: 'hardware',
    label: 'Hardware',
    size: 15,
    color: '#3b82f6'
  },
  {
    id: 'software',
    label: 'Software',
    size: 15,
    color: '#10b981'
  },
  {
    id: 'electronics',
    label: 'Electronics',
    size: 15,
    color: '#f59e0b'
  },
  {
    id: 'datasets',
    label: 'Datasets',
    size: 15,
    color: '#ef4444'
  },
  {
    id: 'website',
    label: 'Website',
    size: 15,
    color: '#8b5cf6'
  },
  
  // Hardware components
  {
    id: 'cad-files',
    label: 'CAD Files',
    url: 'https://cad.onshape.com/documents/43e6fc8c9641771afc022a40/w/1cbdfcc7d56dd7c1edf542ec/e/a96b81b12ad5e86c8b18fb86',
    size: 10,
    color: '#60a5fa'
  },
  {
    id: '3d-models',
    label: '3D Models',
    url: 'https://github.com/opensourceleg/opensourceleg-hardware',
    size: 10,
    color: '#60a5fa'
  },
  {
    id: 'assembly-guides',
    label: 'Assembly Guides',
    url: 'https://github.com/opensourceleg/opensourceleg-hardware/blob/main/BOM.md',
    size: 10,
    color: '#60a5fa'
  },
  
  // Software components
  {
    id: 'control-libraries',
    label: 'Control Libraries',
    url: 'https://github.com/opensourceleg/opensourceleg',
    size: 10,
    color: '#34d399'
  },
  {
    id: 'simulation-tools',
    label: 'Simulation Tools',
    url: 'https://github.com/opensourceleg/opensourceleg-simulation',
    size: 10,
    color: '#34d399'
  },
  {
    id: 'api-documentation',
    label: 'API Documentation',
    url: 'https://docs.opensourceleg.org',
    size: 10,
    color: '#34d399'
  },
  
  // Electronics components
  {
    id: 'pcb-designs',
    label: 'PCB Designs',
    url: 'https://github.com/opensourceleg/opensourceleg-electronics',
    size: 10,
    color: '#fbbf24'
  },
  {
    id: 'sensor-integration',
    label: 'Sensor Integration',
    url: 'https://github.com/opensourceleg/opensourceleg-firmware',
    size: 10,
    color: '#fbbf24'
  },
  {
    id: 'motor-control',
    label: 'Motor Control',
    url: 'https://github.com/opensourceleg/opensourceleg-firmware',
    size: 10,
    color: '#fbbf24'
  },
  
  // Dataset components
  {
    id: 'gait-data',
    label: 'Gait Data',
    url: 'https://github.com/opensourceleg/opensourceleg-datasets',
    size: 10,
    color: '#f87171'
  },
  {
    id: 'calibration-data',
    label: 'Calibration Data',
    url: 'https://github.com/opensourceleg/opensourceleg-datasets/tree/main/sensor-data',
    size: 10,
    color: '#f87171'
  },
  {
    id: 'testing-protocols',
    label: 'Testing Protocols',
    url: 'https://github.com/opensourceleg/opensourceleg/discussions',
    size: 10,
    color: '#f87171'
  },
  
  // Website components
  {
    id: 'documentation',
    label: 'Documentation',
    url: 'https://docs.opensourceleg.org',
    size: 10,
    color: '#a78bfa'
  },
  {
    id: 'community',
    label: 'Community',
    url: 'https://github.com/opensourceleg/opensourceleg/discussions',
    size: 10,
    color: '#a78bfa'
  },
  {
    id: 'tutorials',
    label: 'Tutorials',
    url: 'https://opensourceleg.org/tutorials',
    size: 10,
    color: '#a78bfa'
  }
];

// Define the connections between nodes
export const ecosystemEdges: EcosystemEdge[] = [
  // Root connections to main categories
  { id: 'root-hardware', source: 'root', target: 'hardware' },
  { id: 'root-software', source: 'root', target: 'software' },
  { id: 'root-electronics', source: 'root', target: 'electronics' },
  { id: 'root-datasets', source: 'root', target: 'datasets' },
  { id: 'root-website', source: 'root', target: 'website' },
  
  // Hardware connections
  { id: 'hardware-cad', source: 'hardware', target: 'cad-files' },
  { id: 'hardware-3d', source: 'hardware', target: '3d-models' },
  { id: 'hardware-assembly', source: 'hardware', target: 'assembly-guides' },
  
  // Software connections
  { id: 'software-control', source: 'software', target: 'control-libraries' },
  { id: 'software-simulation', source: 'software', target: 'simulation-tools' },
  { id: 'software-api', source: 'software', target: 'api-documentation' },
  
  // Electronics connections
  { id: 'electronics-pcb', source: 'electronics', target: 'pcb-designs' },
  { id: 'electronics-sensors', source: 'electronics', target: 'sensor-integration' },
  { id: 'electronics-motors', source: 'electronics', target: 'motor-control' },
  
  // Dataset connections
  { id: 'datasets-gait', source: 'datasets', target: 'gait-data' },
  { id: 'datasets-calibration', source: 'datasets', target: 'calibration-data' },
  { id: 'datasets-testing', source: 'datasets', target: 'testing-protocols' },
  
  // Website connections
  { id: 'website-docs', source: 'website', target: 'documentation' },
  { id: 'website-community', source: 'website', target: 'community' },
  { id: 'website-tutorials', source: 'website', target: 'tutorials' }
];

// Mermaid mindmap definition - standard syntax for easy editing
export const mindmapDefinition = `
mindmap
  root(Open-Source Leg)
    ((Hardware))
      (Collaborative CAD Files)
      (Bill of Materials)
      (STEP and DWG Files)
    ((Software))
      (Robot CI)
      (Python API)
      (API Documentation)
    ((Electronics))
      (Expansion Boards)
      (Interface Board)
    ((Research))
      (Publications Database)
      (Public Controllers)
      (Datasets)      
    ((Website))
      (Tutorials)
      (Community Forum)
      (Community Articles)
`;

// URL mapping for clickable nodes - keep alongside mindmap for easy maintenance
export const nodeUrlMap: { [key: string]: string } = {
  // Hardware
  'Collaborative CAD Files': 'https://cad.onshape.com/documents/43e6fc8c9641771afc022a40/w/1cbdfcc7d56dd7c1edf542ec/e/a96b81b12ad5e86c8b18fb86',
  'Bill of Materials': 'https://github.com/opensourceleg/opensourceleg-hardware/blob/main/BOM.md',
  'STEP and DWG Files': 'https://github.com/opensourceleg/opensourceleg-hardware',
  
  // Software
  'Robot CI': 'https://github.com/opensourceleg/opensourceleg',
  'Python API': 'https://github.com/opensourceleg/opensourceleg',
  'API Documentation': 'https://docs.opensourceleg.org',
  
  // Electronics
  'Expansion Boards': 'https://github.com/opensourceleg/opensourceleg-electronics',
  'Interface Board': 'https://github.com/opensourceleg/opensourceleg-electronics',
  
  // Research
  'Publications Database': 'https://github.com/opensourceleg/opensourceleg/discussions',
  'Public Controllers': 'https://github.com/opensourceleg/opensourceleg',
  'Datasets': 'https://github.com/opensourceleg/opensourceleg-datasets',
  
  // Website
  'Tutorials': 'https://opensourceleg.org/tutorials',
  'Community Forum': 'https://github.com/opensourceleg/opensourceleg/discussions',
  'Community Articles': 'https://opensourceleg.org/articles'
};

// Mermaid configuration for the ecosystem mindmap
export const mermaidConfig = {
  startOnLoad: false,
  theme: 'null' as const,
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
}; 