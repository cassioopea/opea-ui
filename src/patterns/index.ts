/**
 * Domain ("pattern") components — built on top of the ui/ primitives and the
 * design tokens. Import these before reaching for raw markup. See DESIGN-SYSTEM.md.
 */
export { MoneyText } from "./money-text";
export type { MoneyTextProps } from "./money-text";

export { PageHeader } from "./page-header";
export type { PageHeaderProps } from "./page-header";

export { SectionHeader } from "./section-header";
export type { SectionHeaderProps } from "./section-header";

export { Stat, StatGroup } from "./stat-card";
export type { StatProps, StatGroupProps } from "./stat-card";

// SurfaceCard was promoted to a primitive — import it from "@/ui".
// (The "@/patterns/surface-card" path still works via a back-compat re-export.)

export { ActionCard } from "./action-card";
export type { ActionCardProps } from "./action-card";

export { AppShell } from "./app-shell";
export type { AppShellProps, NavItem, NavLink } from "./app-shell";

export { FilterBar } from "./filter-bar";
export type { FilterBarProps, FilterOption } from "./filter-bar";

export { HeroBalanceCard } from "./hero-balance-card";
export type { HeroBalanceCardProps } from "./hero-balance-card";

export { DetailDrawer } from "./detail-drawer";
export type { DetailDrawerProps } from "./detail-drawer";

export { WizardLayout } from "./wizard-layout";
export type { WizardLayoutProps, WizardStep } from "./wizard-layout";

export { EmptyState } from "./empty-state";
export type { EmptyStateProps } from "./empty-state";

export { DataTable } from "./data-table";
export type { DataTableColumn, DataTableProps } from "./data-table";

export { Toolbar, SearchInput } from "./toolbar";
export type { ToolbarProps, SearchInputProps } from "./toolbar";

export { AccountSelector } from "./account-selector";
export type { AccountSelectorProps, AccountOption } from "./account-selector";
