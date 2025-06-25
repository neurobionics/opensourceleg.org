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
  // {
  //   title: "Electronics",
  //   type: "featured",
  //   featured: {
  //     title: "Electronics",
  //     description: "Designed to be easy to use and reliable",
  //     href: "/electronics"
  //   },
  //   items: [
  //     {
  //       title: "Downloads",
  //       href: "/electronics/downloads",
  //       description: "One stop shop for all things electronics"
  //     },
  //     {
  //       title: "Tutorials",
  //       href: "/electronics/tutorials",
  //       description: "Step by step guides to use our electronics"
  //     }
  //   ]
  // },
  {
    title: "Research",
    type: "featured",
    featured: {
      title: "Research",
      description: "Research papers, presentations, and other resources",
      href: "/research"
    },
    items: [
      {
        title: "Downloadable Controllers",
        href: "/research/downloads",
        description: "Controllers to try out on the Open-Source Leg"
      },
      {
        title: "Dataset",
        href: "/research/dataset",
        description: "Coming soon..."
      }
    ]
  },
]