// Mermaid mindmap definition
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
  'Collaborative CAD Files': 'https://cad.onshape.com/documents/3520551dd01cf402179e8687/w/87da2fb0a553b44a27833624/e/d9c95c04904f8d6a753006a4',
  'Bill of Materials': 'https://docs.google.com/spreadsheets/d/1qVSoAV6mRzleJ215N53O3MT-OEZ30ZFP/edit?usp=share_link&ouid=101976074095932955884&rtpof=true&sd=true',
  'STEP and DWG Files': '/hardware/downloads',
  
  // Software
  'Robot CI': 'https://github.com/neurobionics/robot-ci',
  'Python API': 'https://github.com/neurobionics/opensourceleg',
  'API Documentation': 'https://neurobionics.github.io/opensourceleg/',
  
  // Electronics
  'Expansion Boards': 'https://available-inventions.umich.edu/product/osl-electronics',
  'Interface Board': '#',
  
  // Research
  'Publications Database': '/research',
  'Public Controllers': '/research/controllers',
  'Datasets': '/research/datasets',
  
  // Website
  'Tutorials': '/hardware/tutorials',
  'Community Forum': 'https://opensourceleg.discourse.group/',
  'Community Articles': '/articles'
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