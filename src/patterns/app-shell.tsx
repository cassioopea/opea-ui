import * as React from "react";
import { Bell, ChevronDown, UserRound, LogOut } from "lucide-react";
import { OpeaLogo } from "@/ui/opea-logo";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";

export interface NavLink {
  href: string;
  label: string;
  description?: string;
  isActive?: boolean;
}

export interface NavItem {
  label: string;
  href?: string;
  isActive?: boolean;
  children?: NavLink[];
}

export interface AppShellProps {
  children: React.ReactNode;
  user?: {
    name: string;
    initials: string;
    email?: string;
    role?: string;
  };
  navigation: NavItem[];
  /** Right-aligned actions on the main nav row (buttons, etc.). */
  actions?: React.ReactNode;
  /**
   * Optional contextual sub-bar above the main nav. The shell only lays out the
   * start/end regions; the app fills them (account, balances, environment chip,
   * privacy toggle…). Keeping these as slots avoids baking any product's domain
   * model into the design system.
   */
  utilityStart?: React.ReactNode;
  utilityEnd?: React.ReactNode;
  onLogout?: () => void;
  /** Inject a custom link component (e.g. react-router's <Link>). */
  renderLink?: (props: { href: string; className?: string; children: React.ReactNode }) => React.ReactNode;
}

export function AppShell({
  children,
  user,
  navigation,
  actions,
  utilityStart,
  utilityEnd,
  onLogout,
  renderLink,
}: AppShellProps) {
  const renderAnchor = (href: string, className: string, children: React.ReactNode) => {
    if (renderLink) {
      return renderLink({ href, className, children });
    }
    return <a href={href} className={className}>{children}</a>;
  };

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        <header className="sticky top-0 z-40 bg-brand-surface text-brand-surface-foreground shadow-elevated">
          {/* Contextual sub-bar (app-provided) */}
          {(utilityStart || utilityEnd) && (
            <div className="border-b border-brand-surface-foreground/10 bg-brand-surface-foreground/[0.04]">
              <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-8 py-2.5 text-caption">
                <div className="flex items-center gap-4">{utilityStart}</div>
                <div className="flex items-center gap-4 text-brand-surface-foreground/65">{utilityEnd}</div>
              </div>
            </div>
          )}

          {/* Main nav row */}
          <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center gap-8 px-8">
            <div className="flex items-center gap-3 text-brand-surface-foreground">
              <OpeaLogo className="h-6 w-auto text-brand-surface-foreground" />
            </div>

            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-0.5">
                {navigation.map((section) => {
                  const sectionActive = section.isActive || section.children?.some((c) => c.isActive);

                  if (!section.children || section.children.length === 0) {
                    return (
                      <NavigationMenuItem key={section.label}>
                        {renderAnchor(
                          section.href ?? "/",
                          cn(
                            "relative inline-flex items-center px-3 py-5 text-subheading font-normal transition-colors",
                            sectionActive
                              ? "text-brand-surface-foreground"
                              : "text-brand-surface-foreground/65 hover:text-brand-surface-foreground",
                          ),
                          <>
                            {section.label}
                            {sectionActive && (
                              <span className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-brand-surface-foreground" />
                            )}
                          </>,
                        )}
                      </NavigationMenuItem>
                    );
                  }

                  return (
                    <NavigationMenuItem key={section.label}>
                      <NavigationMenuTrigger
                        className={cn(
                          "h-auto bg-transparent px-3 py-5 text-subheading font-normal",
                          "hover:bg-brand-surface-foreground/10 focus:bg-brand-surface-foreground/10",
                          "data-[state=open]:bg-brand-surface-foreground/10 data-[state=open]:hover:bg-brand-surface-foreground/10 data-[state=open]:focus:bg-brand-surface-foreground/10",
                          "hover:text-brand-surface-foreground focus:text-brand-surface-foreground data-[state=open]:text-brand-surface-foreground",
                          sectionActive ? "text-brand-surface-foreground" : "text-brand-surface-foreground/65",
                        )}
                      >
                        <span className="relative">
                          {section.label}
                          {sectionActive && (
                            <span className="absolute -inset-x-1 -bottom-[21px] h-[2px] rounded-full bg-brand-surface-foreground" />
                          )}
                        </span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[360px] gap-0.5 p-2 bg-popover">
                          {section.children.map((child) => (
                            <li key={child.href}>
                              {renderAnchor(
                                child.href,
                                cn(
                                  "block rounded-md px-3 py-2 transition-colors",
                                  child.isActive
                                    ? "bg-accent text-accent-foreground"
                                    : "text-foreground hover:bg-accent/60",
                                ),
                                <>
                                  <div className="text-body font-medium leading-tight">{child.label}</div>
                                  {child.description && (
                                    <div className="mt-0.5 text-caption text-muted-foreground">
                                      {child.description}
                                    </div>
                                  )}
                                </>,
                              )}
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="ml-auto flex items-center gap-2">
              {actions}

              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="relative grid size-9 place-items-center rounded-full text-brand-surface-foreground/80 transition hover:bg-brand-surface-foreground/10 hover:text-brand-surface-foreground">
                    <Bell className="size-[18px]" />
                    <span className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Notificações</TooltipContent>
              </Tooltip>

              <span aria-hidden className="mx-2 h-6 w-px bg-brand-surface-foreground/15" />

              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="group flex items-center gap-2 rounded-full py-1 pl-1 pr-2 text-brand-surface-foreground outline-none transition hover:bg-brand-surface-foreground/10">
                    <span className="flex size-8 items-center justify-center rounded-full bg-brand-surface-foreground text-brand-surface text-caption font-semibold">
                      {user.initials}
                    </span>
                    <span className="hidden text-left md:block">
                      <span className="block text-label font-medium leading-tight">{user.name}</span>
                      {user.role && (
                        <span className="block text-caption leading-tight text-brand-surface-foreground/60">
                          {user.role}
                        </span>
                      )}
                    </span>
                    <ChevronDown className="hidden size-3.5 text-brand-surface-foreground/60 transition group-hover:text-brand-surface-foreground md:block" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {user.email && (
                      <>
                        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem>Meu perfil</DropdownMenuItem>
                    <DropdownMenuItem>Preferências</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={onLogout}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <LogOut className="mr-2 size-4" /> Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1440px] flex-1 px-8 py-10">{children}</main>

        <footer className="mt-auto border-t border-border bg-card py-6">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 text-caption text-muted-foreground">
            <span>© {new Date().getFullYear()} Opea SCD · Sociedade de Crédito Direto</span>
            <span className="flex items-center gap-1.5">
              <UserRound className="size-3.5" /> Sessão segura
            </span>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}
