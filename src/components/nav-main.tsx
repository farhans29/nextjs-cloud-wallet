"use client"

import { type LucideIcon } from "lucide-react"
import Link from "next/link"

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

export function NavMain({
  items,
}: {
  items: NavItem[]
}) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton asChild isActive={item.active}>
            <Link href={item.href} className="flex items-center gap-2">
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
              {item.items !== undefined && item.items !== null && (
                <span className="ml-auto text-xs text-muted-foreground">
                  {item.items}
                </span>
              )}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
