"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { navigationConfig } from "@/lib/navigation"

export default function Navbar() {
  const [isVisible, setIsVisible] = React.useState(true)
  const [lastScrollY, setLastScrollY] = React.useState(0)

  React.useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      
      // Show navbar when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true)
      }
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    // Add scroll event listener
    window.addEventListener('scroll', controlNavbar)
    
    // Cleanup
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])

  return (
    <div className={`
      fixed top-0 left-0 right-0 z-50 
      transition-transform duration-300 ease-in-out
      ${isVisible ? 'translate-y-0' : '-translate-y-full'}
    `}>
      <div className="flex justify-center w-full py-4 bg-background/80 backdrop-blur-md">
        <div className="border border-border rounded-lg px-4 py-2 bg-card shadow-sm">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {navigationConfig.map((section) => (
                <NavigationMenuItem key={section.title}>
                  {section.type === 'link' ? (
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href={section.href!}>{section.title}</Link>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        {section.type === 'featured' && section.featured ? (
                          <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                              <NavigationMenuLink asChild>
                                <Link
                                  className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                  href={section.featured.href}
                                >
                                  <div className="mt-4 mb-2 text-lg font-medium">
                                    {section.featured.title}
                                  </div>
                                  <p className="text-muted-foreground text-sm leading-tight">
                                    {section.featured.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            {section.items?.map((item) => (
                              <ListItem key={item.title} href={item.href} title={item.title}>
                                {item.description}
                              </ListItem>
                            ))}
                          </ul>
                        ) : section.type === 'dropdown' && section.items ? (
                          <ul className={`grid ${
                            section.items.length > 3 
                              ? 'gap-2 w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]' 
                              : 'gap-4 w-[300px]'
                          }`}>
                            {section.items.map((item) => (
                              item.description ? (
                                <ListItem key={item.title} href={item.href} title={item.title}>
                                  {item.description}
                                </ListItem>
                              ) : (
                                <li key={item.title}>
                                  <NavigationMenuLink asChild>
                                    <Link href={item.href}>
                                      <div className="font-medium">{item.title}</div>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              )
                            ))}
                          </ul>
                        ) : null}
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
