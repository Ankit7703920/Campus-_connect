
"use client";

import type React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  // useSidebar, // No longer needed here after removing SidebarDecorator
} from '@/components/ui/sidebar';
import { SidebarNav } from './sidebar-nav';
import { Header } from './header';
import { CampusConnectLogo } from '@/components/icons/campus-connect-logo';
import Link from 'next/link';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen flex-col">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="p-4">
            <Link href="/" className="flex items-center gap-2">
              <CampusConnectLogo className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-semibold text-foreground group-data-[collapsible=icon]:hidden">
                CampusConnect
              </h1>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-0">
            <SidebarNav />
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-sidebar-border">
            <p className="text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">
              &copy; {new Date().getFullYear()} CampusConnect
            </p>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
