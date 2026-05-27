import { Button } from "@/components/ui/Button";
import {
  BudgetIcon,
  DashboardIcon,
  GoalsIcon,
  LogoutIcon,
  ReportsIcon,
  SettingsIcon,
  SparklesIcon,
  TransactionsIcon,
  WalletIcon,
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
        "fixed left-0 top-0 z-40 flex h-screen w-[18rem] flex-col border-r border-white/10 bg-surface/95 px-5 py-6 shadow-soft backdrop-blur transition duration-300 md:static md:w-[17rem] md:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/25 to-sky-300/15 text-emerald-200">
          <WalletIcon className="h-6 w-6" />
        </div>
        <div>
          <p className="font-display text-xl text-white">MoneyMate</p>
          <p className="text-xs text-slate-500">Frontend premium</p>
        </div>
      </div>

      <div className="mt-7 rounded-3xl border border-emerald-300/20 bg-emerald-300/8 p-4 text-slate-100">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <SparklesIcon className="h-4 w-4 text-emerald-200" />
          Modo enfoque
        </div>
        <p className="mt-2 text-xs leading-6 text-slate-300">
          Prioriza lo importante: balance, tendencias y decisiones rápidas.
        </p>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-2">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/6 hover:text-white"
              activeClassName="bg-white/9 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
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
        Cerrar sesión
      </Button>
    </aside>
  </>
);
