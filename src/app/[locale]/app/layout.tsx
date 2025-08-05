"use client";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  IconDashboard,
  IconSettings,
  IconUsers,
  IconChartBar,
  IconFolder,
  IconBell,
  IconLogout,
} from "@tabler/icons-react";
import { useState } from "react";
import { motion } from "motion/react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconDashboard className="text-muted-foreground h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Projects",
      href: "#",
      icon: (
        <IconFolder className="text-muted-foreground h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Analytics",
      href: "#",
      icon: (
        <IconChartBar className="text-muted-foreground h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Team",
      href: "#",
      icon: (
        <IconUsers className="text-muted-foreground h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Notifications",
      href: "#",
      icon: (
        <IconBell className="text-muted-foreground h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-muted-foreground h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconLogout className="text-muted-foreground h-5 w-5 shrink-0" />
      ),
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-background w-full flex-1 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Rafael Oliveira",
                href: "#",
                icon: (
                  <div className="h-7 w-7 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs text-primary-foreground font-medium">RO</span>
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1">
        <div className="p-4 md:p-8 bg-background flex flex-col gap-2 flex-1 w-full h-full overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20">
      <img src="/logo.png" alt="Liro Logo" className="h-8 w-auto" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-foreground whitespace-pre"
      >
        Liro
      </motion.span>
    </div>
  );
};

export const LogoIcon = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20">
      <img src="/logo.png" alt="Liro Logo" className="h-8 w-auto" />
    </div>
  );
};
