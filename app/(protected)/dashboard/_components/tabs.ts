import { LayoutDashboard, Upload, type LucideIcon } from "lucide-react";

export interface DashboardTab {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

// Add new dashboard sections here; the nav and overview cards read from it.
export const DASHBOARD_TABS: DashboardTab[] = [
  {
    href: "/dashboard",
    label: "Resumen",
    description: "Vista general de tu cuenta",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/upload",
    label: "Subir fotografías",
    description: "Marca y publica fotografías de vehículos",
    icon: Upload,
  },
];
