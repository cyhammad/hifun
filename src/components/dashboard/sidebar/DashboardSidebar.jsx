"use client";

import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  DashboardIcon,
  UsersIcon,
  DisputesIcon,
  AnalyticsIcon,
  SettingsIcon,
  LogoutIcon,
  MenuIcon,
} from "@/components/icons/icons";
import { ChatIcon } from "@/app/admin/chat/_components/ChatIcons";

const menuItems = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    href: "/admin",
  },
  {
    title: "Users",
    icon: UsersIcon,
    href: "/admin/users",
  },
  {
    title: "Disputes",
    icon: DisputesIcon,
    href: "/admin/disputes",
  },

  {
    title: "Analytics",
    icon: AnalyticsIcon,
    href: "/admin/analytics",
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    href: "/admin/settings",
  },
];

// Reusable navigation component
const SidebarNav = ({ currentPath, onNavigate }) => {
  const [loggingOut, setLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      // Call logout API to clear cookies
      await fetch("/api/admin/auth/logout", {
        method: "POST",
      });

      // Redirect to sign-in page
      window.location.href = "/admin/sign-in";
    } catch (error) {
      console.error("Logout failed:", error);
      // Still redirect even if API fails
      window.location.href = "/admin/sign-in";
    }
  };

  return (
    <div className="flex flex-col h-full justify-between w-full font-inter">
      <div className="flex flex-col w-full">
        {/* Logo Section */}
        <div className="mb-14 flex items-center justify-start ml-2">
          <Image
            src="/logo.png"
            alt="HiFun"
            width={120}
            height={40}
            className="object-contain select-none"
            priority
          />
        </div>

        {/* Navigation Section */}
        <nav className="flex flex-col gap-[8px] w-full">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? currentPath === "/admin"
                : currentPath.startsWith(item.href);

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 w-full h-[52px] rounded-[12px] px-4 transition-all duration-200 group ${isActive
                  ? "bg-[#582BB3] text-white shadow-md"
                  : "text-[#8C8C8C] hover:bg-white/5 hover:text-white"
                  }`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <Icon
                    className={`w-5 h-5 ${isActive
                      ? "text-white"
                      : "text-[#8C8C8C] group-hover:text-white"
                      }`}
                  />
                </div>
                <span
                  className={`font-medium text-[16px] ${isActive ? "text-white" : "text-[#8C8C8C]"}`}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout Section */}
      <div className="w-full">
        <div className="border-t border-white/10 mb-6 w-full" />
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-3 w-full h-[52px] px-4 text-[#B0B0B0] hover:text-white hover:bg-white/5 rounded-[16px] transition-all duration-200 group disabled:opacity-50"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            {loggingOut ? (
              <div className="w-5 h-5 border-2 border-[#B0B0B0] border-t-transparent rounded-full animate-spin" />
            ) : (
              <LogoutIcon className="w-5 h-5 text-[#B0B0B0] group-hover:text-white" />
            )}
          </div>
          <span className="font-medium text-[16px]">{loggingOut ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </div>
  );
};

// Mobile Sidebar with Sheet
export function MobileSidebar() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors">
          <MenuIcon className="w-6 h-6 text-white" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] p-6 bg-[#080707] border-none font-inter"
      >
        <VisuallyHidden.Root>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden.Root>
        <SidebarNav currentPath={pathname} onNavigate={() => { }} />
      </SheetContent>
    </Sheet>
  );
}

// Desktop Sidebar
export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-[340px] p-[24px] h-full bg-transparent border-r border-white/10 shrink-0 sticky top-0 font-inter">
      <SidebarNav currentPath={pathname} />
    </aside>
  );
}
