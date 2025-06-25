/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  
  // Static export configuration for GitHub Pages
  output: 'export',
  trailingSlash: true,
  
  // GitHub Pages basePath configuration
  basePath: process.env.GITHUB_PAGES ? '/opensourceleg.org' : '',
  assetPrefix: process.env.GITHUB_PAGES ? '/opensourceleg.org' : '',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
