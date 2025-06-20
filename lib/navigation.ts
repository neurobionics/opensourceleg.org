export interface NavigationItem {
  title: string
  href: string
  description?: string
}

export interface NavigationDropdown {
  title: string
  items: NavigationItem[]
}

export interface NavigationSection {
  title: string
  href?: string
  type: 'link' | 'dropdown' | 'featured'
  items?: NavigationItem[]
  featured?: {
    title: string
    description: string
    href: string
  }
}

// Main navigation structure
export const navigationConfig: NavigationSection[] = [
  {
    title: "About",
    type: "link",
    href: "/about"
  },
  {
    title: "Articles",
    type: "link",
    href: "/articles"
  },
  {
    title: "Hardware",
    type: "featured",
    featured: {
      title: "Hardware",
      description: "Designed to be easy to manufacture, assemble, and repair",
      href: "/hardware"
    },
    items: [
      {
        title: "Getting Started",
        href: "/hardware/getting-started",
        description: "How to get started with our hardware"
      },
      {
        title: "Downloads",
        href: "/hardware/downloads",
        description: "One stop shop for all things hardware"
      },
      {
        title: "Tutorials",
        href: "/hardware/tutorials",
        description: "Step by step guides to build our hardware"
      }
    ]
  },
  {
    title: "Software",
    type: "featured",
    featured: {
      title: "Software",
      description: "Designed to be easy to use, modify, and extend",
      href: "/software"
    },
    items: [
      {
        title: "Getting Started",
        href: "/software/getting-started",
        description: "How to get started with our software"
      },
      {
        title: "Downloads",
        href: "/software/downloads",
        description: "One stop shop for all things software"
      },
      {
        title: "Tutorials",
        href: "/software/tutorials",
        description: "Step by step guides to use our software"
      }
    ]
  },
  {
    title: "Electronics",
    type: "featured",
    featured: {
      title: "Electronics",
      description: "Designed to be easy to use and reliable",
      href: "/electronics"
    },
    items: [
      {
        title: "Getting Started",
        href: "/electronics/getting-started",
        description: "How to get started with our electronics"
      },
      {
        title: "Downloads",
        href: "/electronics/downloads",
        description: "One stop shop for all things electronics"
      },
      {
        title: "Tutorials",
        href: "/electronics/tutorials",
        description: "Step by step guides to use our electronics"
      }
    ]
  },
  {
    title: "Community",
    type: "featured",
    featured: {
      title: "Forum",
      description: "Join our community to get help, share your work, and get inspired",
      href: "https://opensourceleg.discourse.group/"
    },
    items: [
      {
        title: "Governance",
        href: "/governance",
        description: "How we are governed and how you can get involved"
      },
      {
        title: "Code of Conduct",
        href: "/code-of-conduct",
        description: "Our code of conduct for the community"
      },
      {
        title: "License",
        href: "/license",
        description: "Our licenses for the various components of the project"
      }
    ]
  },
  {
    title: "Contact",
    type: "link",
    href: "/contact"
  }
]