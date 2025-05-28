"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Users,
  CreditCard,
  UserCircle,
  BarChart2,
  Award,
  Network,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Home,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  onNavClick?: () => void;
}

const NavItem = ({ href, icon, title, isActive, onNavClick }: NavItemProps) => (
  <Link
    href={href}
    onClick={onNavClick}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
      isActive
        ? "bg-primary text-primary-foreground"
        : "hover:bg-secondary text-muted-foreground hover:text-foreground"
    )}
  >
    {icon}
    <span>{title}</span>
  </Link>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const navItems = [
    {
      href: "/crm/admins",
      icon: <Users size={18} />,
      title: "Administrators",
    },
    {
      href: "/crm/subscriptions",
      icon: <CreditCard size={18} />,
      title: "Subscriptions",
    },
    {
      href: "/crm/clients",
      icon: <UserCircle size={18} />,
      title: "Clients",
    },
    {
      href: "/crm/segments",
      icon: <BarChart2 size={18} />,
      title: "Segments",
    },
    {
      href: "/crm/loyalty",
      icon: <Award size={18} />,
      title: "Loyalty",
    },
    {
      href: "/crm/network",
      icon: <Network size={18} />,
      title: "Network",
    },
  ];

  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top header */}
      <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-3 md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle Menu"
          >
            {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            <span className="font-semibold">CRM System</span>
          </Link>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            <span className="font-semibold">CRM System</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <ModeToggle />
          <Separator orientation="vertical" className="h-8" />
          <div className="flex items-center gap-4">
            <div className="hidden text-sm md:block">
              <div className="font-medium">John Doe</div>
              <div className="text-xs text-muted-foreground">Administrator</div>
            </div>
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatar.png" alt="Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={closeMobileNav}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto bg-background p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                <span className="font-semibold">CRM System</span>
              </Link>
              <Button
                variant="outline"
                size="icon"
                onClick={closeMobileNav}
                aria-label="Close Menu"
              >
                <X size={18} />
              </Button>
            </div>
            <div className="mt-6 space-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  title={item.title}
                  isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                  onNavClick={closeMobileNav}
                />
              ))}
            </div>
            <div className="mt-6">
              <Separator className="mb-6" />
              <Link href="/login">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <LogOut size={18} />
                  <span>Log Out</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <div className="hidden border-r bg-background md:block">
          <div className="flex h-full w-64 flex-col gap-2 p-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  title={item.title}
                  isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                />
              ))}
            </div>
            <div className="mt-auto">
              <Separator className="mb-4" />
              <Link href="/login">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <LogOut size={18} />
                  <span>Log Out</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-muted/20">{children}</main>
      </div>
    </div>
  );
}