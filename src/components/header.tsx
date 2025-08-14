"use client";

import * as React from "react";
import Link from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "./magicui/shimmer-button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { UserMenu } from "./user-menu";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "./theme-toggle";

function useNavigation() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "br";

  return [
    {
      title: t("services"),
      href: "#services",
      items: [
        {
          title: t("customDevelopment"),
          href: "#custom-development",
          description: t("customDevelopmentDesc"),
        },
        {
          title: t("systemIntegration"),
          href: "#integration",
          description: t("systemIntegrationDesc"),
        },
        {
          title: t("performanceOptimization"),
          href: "#optimization",
          description: t("performanceOptimizationDesc"),
        },
      ],
    },
    {
      title: t("about"),
      href: `/${locale}/company`,
    },
    {
      title: t("careers"),
      href: `/${locale}/careers`,
    },
    {
      title: t("contact"),
      href: `/${locale}/lets-talk`,
    },
  ];
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navigation = useNavigation();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const { isAuthenticated, loading } = useAuth();
  const locale = pathname.split("/")[1] || "br";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Liro Logo" className="h-8 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.items ? (
                    <>
                      <NavigationMenuTrigger>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.items.map((subItem) => (
                            <ListItem
                              key={subItem.title}
                              title={subItem.title}
                              href={subItem.href}
                            >
                              {subItem.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      asChild
                    >
                      <Link href={item.href}>{item.title}</Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* CTA Button - Desktop */}
        <div className="hidden md:flex items-center space-x-2">
          <ThemeToggle />
          <LanguageSwitcher />
          {!loading &&
            (isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/${locale}/login`}>Login</Link>
              </Button>
            ))}
          <ShimmerButton className="text-sm">
            {t("contactUs")}
          </ShimmerButton>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <HamburgerMenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center space-x-2">
                  <img src="/logo.png" alt="Liro Logo" className="h-6 w-auto" />
                  <span>Liro</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6">
                <ul className="space-y-4">
                  {navigation.map((item) => (
                    <li key={item.title}>
                      {item.items ? (
                        <div>
                          <div className="text-sm font-medium text-foreground mb-2">
                            {item.title}
                          </div>
                          <ul className="ml-4 space-y-2">
                            {item.items.map((subItem) => (
                              <li key={subItem.title}>
                                <Link
                                  href={subItem.href}
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {subItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-3">
                  <ThemeToggle />
                  <LanguageSwitcher />
                  {!loading &&
                    (isAuthenticated ? (
                      <UserMenu />
                    ) : (
                      <Button variant="outline" asChild>
                        <Link href={`/${locale}/login`}>Login</Link>
                      </Button>
                    ))}
                  <ShimmerButton>{t("contact")}</ShimmerButton>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
