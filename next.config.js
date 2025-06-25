const createMDX = require('@next/mdx')

const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  
  // Static export configuration for GitHub Pages
  output: 'export',
  trailingSlash: true,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true
  }
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig)
