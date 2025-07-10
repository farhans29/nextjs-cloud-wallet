"use client"

import Link from "next/link"
import React from "react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type NavItem = {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  active: boolean
  items?: number | null
}

export function NavSecondary({
  items,
}: {
  items: NavItem[]
}) {
  return (
    <SidebarMenu>
      {items.map((item) => {
        const Icon = item.icon
        return (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild isActive={item.active}>
              <Link href={item.href} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
                {item.items !== undefined && item.items !== null && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    {item.items}
                  </span>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}
