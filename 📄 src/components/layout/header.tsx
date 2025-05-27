"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';
import { CampusConnectLogo } from '@/components/icons/campus-connect-logo';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile';

export function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6 shadow-sm">
      <div className="flex items-center gap-2">
        {isMobile && <SidebarTrigger />}
        <Link href="/" className="flex items-center gap-2 md:hidden">
          <CampusConnectLogo className="h-6 w-6 text-primary" />
          <span className="font-semibold text-foreground">CampusConnect</span>
        </Link>
      </div>
      {/* Placeholder for User Profile Dropdown or other actions */}
      {/* <UserNav /> */}
    </header>
  );
}
