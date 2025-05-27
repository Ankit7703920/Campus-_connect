"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Home,
  LayoutGrid,
  BookOpen,
  FileText,
  Briefcase,
  Utensils,
  Sparkles,
  UserPlus, // Added UserPlus icon
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Recommendations', icon: Sparkles },
  { href: '/browse', label: 'Browse All', icon: LayoutGrid },
  { href: '/books', label: 'Books', icon: BookOpen },
  { href: '/notes', label: 'Notes', icon: FileText },
  { href: '/gigs', label: 'Gigs', icon: Briefcase },
  { href: '/meals', label: 'Meals', icon: Utensils },
  { href: '/signup', label: 'Sign Up', icon: UserPlus }, // Added Sign Up link
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu className="p-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        return (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href} legacyBehavior passHref>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.label}
                className={cn(
                  "justify-start",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <a>
                  <Icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
