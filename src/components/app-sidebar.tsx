"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  Wallet,
  CreditCard,
  LineChart,
  PiggyBank,
  Settings,
  HelpCircle,
  Plus,
  Search,
  Star,
  Folder,
  PlusCircle,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavFavorites } from "@/components/nav-favorites";
import { NavWorkspaces } from "@/components/nav-workspaces";
import { NavActions } from "@/components/nav-actions";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  items?: number | null;
};

type NavData = {
  main: NavItem[];
  secondary: NavItem[];
  favorites: Array<{
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    active: boolean;
  }>;
  workspaces: Array<{
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    items: Array<{
      name: string;
      href: string;
      icon: React.ComponentType<{ className?: string }>;
      active: boolean;
    }>;
  }>;
};

// Navigation data
const navData: NavData = {
  main: [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      active: false,
      items: null,
    },
    {
      name: "Transactions",
      href: "/transactions",
      icon: CreditCard,
      active: false,
      items: 5,
    },
    {
      name: "Budgets",
      href: "/budgets",
      icon: Wallet,
      active: false,
      items: 3,
    },
    {
      name: "Investments",
      href: "/investments",
      icon: LineChart,
      active: false,
      items: null,
    },
    {
      name: "Savings",
      href: "/savings",
      icon: PiggyBank,
      active: false,
      items: 2,
    },
  ],
  favorites: [
    {
      name: "Monthly Budget",
      href: "/budgets/monthly",
      icon: Star,
      active: false,
    },
    {
      name: "Investment Portfolio",
      href: "/investments/portfolio",
      icon: Star,
      active: false,
    },
  ],
  workspaces: [
    {
      name: "Personal",
      icon: Folder,
      items: [
        {
          name: "Expenses",
          href: "/workspace/personal/expenses",
          icon: CreditCard,
          active: false,
        },
        {
          name: "Savings",
          href: "/workspace/personal/savings",
          icon: PiggyBank,
          active: false,
        },
      ],
    },
  ],
  secondary: [
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      active: false,
      items: null,
    },
    {
      name: "Help & Support",
      href: "/help",
      icon: HelpCircle,
      active: false,
      items: null,
    },
  ],
};

export function AppSidebar() {
  const pathname = usePathname();

  // Update active states based on current path
  const updatedNavData = React.useMemo(() => {
    return {
      ...navData,
      main: navData.main.map((item) => ({
        ...item,
        active:
          pathname === item.href ||
          (pathname.startsWith(item.href) && item.href !== "/") ||
          (pathname === "/" && item.href === "/dashboard"),
      })),
      secondary: navData.secondary.map((item) => ({
        ...item,
        active: pathname === item.href,
      })),
      favorites: navData.favorites.map((item) => ({
        ...item,
        active: pathname === item.href,
      })),
      workspaces: navData.workspaces.map((workspace) => ({
        ...workspace,
        items: workspace.items.map((item) => ({
          ...item,
          active: pathname === item.href,
        })),
      })),
    };
  }, [pathname]);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <Wallet className="h-6 w-6 text-primary" />
            <span className="font-bold">Cloud Wallet</span>
          </div>
          <NavActions />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Fixed Main Navigation */}
        <div className="sticky top-0 z-10 bg-background pb-2">
          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-8 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
          <NavMain items={updatedNavData.main} />
          <div className="px-4 py-2">
            <Button className="w-full" size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Transaction
            </Button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <SidebarGroup>
            <SidebarGroupLabel>Favorites</SidebarGroupLabel>
            <SidebarGroupContent>
              <NavFavorites items={updatedNavData.favorites} />
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
            <SidebarGroupContent>
              <NavWorkspaces workspaces={updatedNavData.workspaces} />
            </SidebarGroupContent>
          </SidebarGroup>

          <div className="mt-auto">
            <NavSecondary items={updatedNavData.secondary} />
          </div>
        </div>
      </SidebarContent>

      {/* 
        <SidebarRail>
          <NavSecondary items={updatedNavData.secondary} />
        </SidebarRail> 
      */}
    </Sidebar>
  );
}
