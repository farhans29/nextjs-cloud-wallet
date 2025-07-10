"use client"

import { ChevronRight, MoreHorizontal, Plus } from "lucide-react"
import Link from "next/link"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

type WorkspaceItem = {
  name: string
  icon: React.ComponentType<{ className?: string }>
  items: Array<{
    name: string
    href: string
    icon: React.ComponentType<{ className?: string }>
    active: boolean
  }>
}

export function NavWorkspaces({
  workspaces,
}: {
  workspaces: WorkspaceItem[]
}) {
  return (
    <SidebarMenu>
      {workspaces.map((workspace) => {
        const WorkspaceIcon = workspace.icon
        return (
          <Collapsible key={workspace.name} defaultOpen>
            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-between">
                <div className="flex items-center gap-2">
                  <WorkspaceIcon className="h-4 w-4" />
                  <span>{workspace.name}</span>
                </div>
                <CollapsibleTrigger asChild>
                  <div className="flex items-center">
                    <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  </div>
                </CollapsibleTrigger>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <CollapsibleContent>
              <SidebarMenuSub>
                {workspace.items.map((item) => {
                  const ItemIcon = item.icon
                  return (
                    <SidebarMenuSubItem key={item.name}>
                      <SidebarMenuSubButton asChild isActive={item.active}>
                        <Link href={item.href} className="flex items-center gap-2">
                          <ItemIcon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )
                })}
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>
                    <Plus className="h-4 w-4" />
                    <span>New Page</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        )
      })}
    </SidebarMenu>
  )
}
