"use client"

import { MoreHorizontal } from "lucide-react"
import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
} from "@/components/ui/sidebar"

type FavoriteItem = {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  active: boolean
}

export function NavFavorites({
  items,
}: {
  items: FavoriteItem[]
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
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction>
                  <MoreHorizontal className="h-3 w-3" />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="right">
                <DropdownMenuItem asChild>
                  <Link href={item.href} className="flex items-center gap-2">
                    <span>View</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        )
      })}
      <SidebarMenuItem>
        <SidebarMenuButton className="text-sidebar-foreground/70">
          <MoreHorizontal />
          <span>More</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
