import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import {
  BudgetIcon,
  DashboardIcon,
  GoalsIcon,
  LogoutIcon,
  ReportsIcon,
  SettingsIcon,
  TransactionsIcon,
} from "@/components/ui/Icons";
import { NavLink } from "@/routes/RouterProvider";
import { cn } from "@/utils/cn";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: DashboardIcon },
  { href: "/transactions", label: "Movimientos", icon: TransactionsIcon },
  { href: "/budgets", label: "Presupuestos", icon: BudgetIcon },
  { href: "/goals", label: "Metas", icon: GoalsIcon },
  { href: "/reports", label: "Reportes", icon: ReportsIcon },
  { href: "/settings", label: "Configuración", icon: SettingsIcon },
];

interface SidebarProps {
  isMobileOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const Sidebar = ({
  isMobileOpen,
  onClose,
  onLogout,
}: SidebarProps) => (
  <>
    <div
      className={cn(
        "fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm transition md:hidden",
        isMobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      onClick={onClose}
    />
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen w-[17rem] flex-col border-r border-white/10 bg-surface/95 px-4 py-5 shadow-soft backdrop-blur transition duration-300 md:static md:w-[15.5rem] md:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="rounded-[1.75rem] border border-white/8 bg-black/40 p-3">
        <BrandLogo className="mx-auto h-14" />
      </div>

      <nav className="mt-6 flex flex-1 flex-col gap-2">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/6 hover:text-white"
              activeClassName="bg-gradient-to-r from-secondary/14 to-primary/14 text-white shadow-[inset_0_0_0_1px_rgba(123,232,207,0.12)]"
              onClick={onClose}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <Button variant="secondary" className="w-full justify-start" onClick={onLogout}>
        <LogoutIcon className="h-4 w-4" />
        Salir
      </Button>
    </aside>
  </>
);
